import React, { useState } from 'react';

import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

import { updateUser, addPrice } from '@src/store/actions/UserAction';
import { UserState } from '@src/store/reducers/UserReducer';
import { UserGenderEnum, TherapistStatusEnum } from '@src/services/openapi';

import {
  RadiusLocationIcon,
  ArrowRightIcon,
  QualificationIcon,
  Badge2Icon,
  BioIcon,
  GenderIcon,
  InterestIcon,
  RateIcon,
  StatusIcon,
  SwitchIcon,
} from '@src/components/icons';

import useStore from '@src/hooks/useStore';
import useImageViewer from '@src/hooks/useImageViewer';

import { validateServiceArea } from '@src/utlities/validations';

import InputModal, { Props as InputModalProps } from '@src/modals/InputModal';
import QualificationsModal from '@src/modals/QualificationsModal';
import ReviewsModal from '@src/modals/ReviewsModal';

import Text from '@src/components/Text';
import View from '@src/components/View';
import Button from '@src/components/Button';
import GenderToggle from '@src/components/GenderToggle';
import DatePicker from '@src/components/DatePicker';

import ProfilePriceTableCard, { PriceModal } from './ProfilePriceTableCard';
import ProfileListCard from './ProfileListCard';

type TherapistProfileProps = {
  therapist?: UserState;
  modal?: boolean;
};


const TherapistProfile = ({ modal, therapist }: TherapistProfileProps) => {
  const { store: { user }, dispatch } = useStore();
  const userInfo = !modal ? user : therapist;

  // const { viewer, onPressImage } = useImageViewer(userInfo.certifications);
  const [isAvailable, setAvailable] = useState(userInfo.status ? userInfo.status === 'A' : false);


  const [priceModalProps, setPriceModalProps] = useState(null);
  const [inputModalProps, setInputModalProps] = useState<Omit<InputModalProps, 'visible' | 'onClose'>>(null);

  const [modals, setModals] = useState({
    isQualificationModalVisible: false,
    isReviewsModalVisible: false,
  });

  const onCloseModal = (key: string) => () => setModals({ ...modals, [key]: false });

  const onPressGender = (type: UserGenderEnum) => async () => {
    try {
      await dispatch(updateUser({ gender: type }));
    } catch (error) {
      // console.log(error);
    }
  };

  const pressStatus = async () => {
    if (isAvailable) {
      try {
        await dispatch(updateUser({ status: TherapistStatusEnum.B }));
        setAvailable(false);
      } catch (error) {
        // console.log(error);
      }
    } else {
      try {
        await dispatch(updateUser({ status: TherapistStatusEnum.A }));
        setAvailable(true);
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const onSubmitPriceModal = async (sessionType: string, price: string) => {
    await dispatch(addPrice(sessionType, price));
    setPriceModalProps(null);
  };

  const onSubmitInputModal = (key: keyof UserState) => async (value: string) => {
    try {
      await dispatch(updateUser({ [key]: value }));
      setInputModalProps(null);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      {/* {viewer} TODO: add image viewer diagnosis/certifications */}

      <PriceModal
        {...priceModalProps}
        visible={!!priceModalProps}
        onSubmit={onSubmitPriceModal}
        onClose={() => setPriceModalProps(null)}
      />
      <InputModal
        {...inputModalProps}
        buttonActionText
        visible={!!inputModalProps}
        onClose={() => setInputModalProps(null)}
      />
      <QualificationsModal
        visible={modals.isQualificationModalVisible}
        onToggle={onCloseModal('isQualificationModalVisible')}
      />
      <ReviewsModal
        isModalVisible={modals.isReviewsModalVisible}
        closeInputModal={onCloseModal('isReviewsModalVisible')}
      />

      <View scroll bgColor="lightGrey">
        <TouchableWithoutFeedback>
          <TouchableHighlight>
            <View flex={1}>
              <ProfilePriceTableCard
                readonly={!!modal}
                onOpenPriceModal={setPriceModalProps}
              />
              <ProfileListCard
                readonly={!!modal}
                rows={[
                  {
                    hideOnReadonly: true,
                    title: 'Service Area',
                    icon: RadiusLocationIcon,
                    content: (
                      <View row justifyCenter>
                        <View justifyCenter>
                          <Text variant="boldPrimary" spacing={{ mr: 2 }}>
                            {userInfo.operationRadius ? `${userInfo.operationRadius} miles` : 'Set'}
                          </Text>
                        </View>
                        <ArrowRightIcon />
                      </View>
                    ),
                    onPress: () => !modal && setInputModalProps({
                      title: 'Service Area',
                      existingValue: userInfo.operationRadius.toString() || '',
                      placeholder: 'Radius (mi)',
                      keyboardType: 'number-pad',
                      validate: validateServiceArea,
                      error: 'Please enter a valid service area number',
                      buttonText: 'Radius',
                      onSubmit: onSubmitInputModal('operationRadius'),
                    }),
                  },
                  {
                    hideOnReadonly: true,
                    title: 'Status',
                    icon: StatusIcon,
                    content: (
                      <View row justifyCenter>
                        <View justifyCenter>
                          {isAvailable ? (
                            <Text spacing={{ mr: 2 }} variant="regularSmallSuccess">Available</Text>
                          ) : (
                            <Text spacing={{ mr: 2 }} variant="regularSmallGrey">Unavailable</Text>
                          )}
                        </View>
                        <View onPress={pressStatus}><SwitchIcon isOn={isAvailable} /></View>
                      </View>
                    ),
                  },
                  {
                    title: 'Reviews',
                    icon: RateIcon,
                    content: (
                      <View alignCenter>
                        <Text variant="boldPrimary" spacing={{ mr: 2 }}>
                          {userInfo.reviewCount || 'N/A'}
                        </Text>
                      </View>
                    ),
                    onPress: () => !modal && setModals({ ...modals, isReviewsModalVisible: true }),
                  },
                ]}
              />
              <ProfileListCard
                readonly={!!modal}
                rows={[
                  {
                    title: 'Gender',
                    icon: GenderIcon,
                    content: modal ? (
                      <View alignCenter>
                        <Text variant="boldPrimary" spacing={{ mr: 2 }}>
                          {userInfo.gender || 'N/A'}
                        </Text>
                      </View>
                    ) : (
                      <GenderToggle
                        readonly={!!modal}
                        existingValue={userInfo.gender}
                        onToggle={onPressGender}
                      />
                    ),
                  },
                ]}
              />
              <ProfileListCard
                column
                readonly={!!modal}
                rows={[
                  {
                    title: 'Personal Bio',
                    icon: BioIcon,
                    content: userInfo.bio || (modal ? 'N/A' : 'Set Personal Bio'),
                    onPress: () => !modal && setInputModalProps({
                      title: 'Personal Bio',
                      existingValue: userInfo.bio || '',
                      placeholder: 'Personal bio',
                      buttonText: 'Bio',
                      onSubmit: onSubmitInputModal('bio'),
                    }),
                  },
                  {
                    title: 'License Number',
                    icon: Badge2Icon,
                    content: userInfo.licenseNumber || (modal ? 'N/A' : 'Set License Number'),
                    onPress: () => !modal && setInputModalProps({
                      title: 'License Number',
                      existingValue: userInfo.licenseNumber || '',
                      placeholder: 'License number',
                      buttonText: 'License No.',
                      onSubmit: onSubmitInputModal('licenseNumber'),
                    }),
                  },
                  {
                    title: 'Years of Experience',
                    icon: InterestIcon,
                    content: userInfo.certDate || (modal ? 'N/A' : (
                      <DatePicker
                        existingDate={userInfo.certDate ? userInfo.certDate : ''}
                        placeholder="Set License Date"
                        onChange={onSubmitInputModal('certDate')}
                      />
                    )),
                  },
                  {
                    title: 'Qualifications',
                    icon: QualificationIcon,
                    content: userInfo.preferredAilments.join(', ') || 'Set Qualifications',
                    onPress: () => !modal && setModals({ ...modals, isQualificationModalVisible: true }),
                  },
                ]}
              />
            </View>
          </TouchableHighlight>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default TherapistProfile;
