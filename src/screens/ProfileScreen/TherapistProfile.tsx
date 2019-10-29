import React, { useState } from 'react';
import { formatDistanceStrict } from 'date-fns';

import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

import { updateUser, addPrice } from '@src/store/actions/UserAction';
import { UserState } from '@src/store/reducers/UserReducer';
import { UserGenderEnum, TherapistStatusEnum, PriceSessionTypeEnum } from '@src/services/openapi';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';

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
} from '@src/components/icons';

import InputModal, { Props as InputModalProps } from '@src/modals/InputModal';
import QualificationsModal from '@src/modals/QualificationsModal';
import ReviewsModal from '@src/modals/ReviewsModal';

import Text from '@src/components/Text';
import View from '@src/components/View';
import Toggle from '@src/components/Toggle';
import GenderToggle from '@src/components/GenderToggle';
import DatePicker from '@src/components/DatePicker';

import ProfilePriceTableCard, { PriceModal } from './ProfilePriceTableCard';
import ProfileListCard from './ProfileListCard';

type TherapistProfileProps = {
  therapist?: UserState;
  modal?: boolean;
};

type UniqueInputModalProps = Omit<InputModalProps, 'visible' | 'onClose'>;

const TherapistProfile = ({ modal, therapist }: TherapistProfileProps) => {
  const { store: { user }, dispatch } = useStore();
  const navigation = useNavigation();

  const userInfo = !modal ? user : therapist;

  const [priceModalProps, setPriceModalProps] = useState(null);
  const [inputModalProps, setInputModalProps] = useState<UniqueInputModalProps>(null);

  const [modals, setModals] = useState({
    isQualificationModalVisible: false,
    isReviewsModalVisible: false,
  });

  const onCloseModal = (key: string) => () => setModals({ ...modals, [key]: false });

  const onChangeGender = async (type: UserGenderEnum) => {
    try {
      await dispatch(updateUser({ gender: type }));
    } catch (error) {
      // console.log(error);
    }
  };

  const onToggleStatus = async (isAvailable) => {
    if (!isAvailable) {
      try {
        await dispatch(updateUser({ status: TherapistStatusEnum.B }));
      } catch (error) {
        // console.log(error);
      }
    } else {
      try {
        await dispatch(updateUser({ status: TherapistStatusEnum.A }));
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const onSubmitPriceModal = async (sessionType: PriceSessionTypeEnum, price: number) => {
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

  const onPressAdress = () => {
    navigation.navigate('AddressSettingsScreen');
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
        therapist={userInfo}
        visible={modals.isReviewsModalVisible}
        onClose={onCloseModal('isReviewsModalVisible')}
      />

      <View scroll bgColor="lightGrey">
        <TouchableWithoutFeedback>
          <TouchableHighlight>
            <View flex={1}>
              <ProfilePriceTableCard
                readonly={!!modal}
                existing={userInfo.prices}
                onOpenPriceModal={setPriceModalProps}
              />
              <ProfileListCard
                readonly={!!modal}
                rows={[
                  {
                    hideOnReadonly: true,
                    title: 'Address',
                    icon: RadiusLocationIcon,
                    content: <ArrowRightIcon />,
                    onPress: onPressAdress,
                  },
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
                      existingValue: userInfo.operationRadius || '',
                      placeholder: 'Radius (mi)',
                      keyboardType: 'number-pad',
                      validation: 'number',
                      buttonText: 'Radius',
                      onSubmit: onSubmitInputModal('operationRadius'),
                    }),
                  },
                  {
                    hideOnReadonly: true,
                    title: 'Status',
                    icon: StatusIcon,
                    content: (
                      <Toggle
                        onLabel="Available"
                        offLabel="Unavailable"
                        existingValue={userInfo.status === 'A'}
                        onToggle={onToggleStatus}
                      />
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
                    onPress: () => setModals({ ...modals, isReviewsModalVisible: true }),
                  },
                ]}
              />
              <ProfileListCard
                readonly={!!modal}
                rows={[
                  {
                    title: 'Gender',
                    icon: GenderIcon,
                    content: (
                      <GenderToggle
                        readonly={!!modal}
                        existingValue={userInfo.gender}
                        onToggle={onChangeGender}
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
                    onPress: !modal ? () => setInputModalProps({
                      multiline: true,
                      title: 'Personal Bio',
                      existingValue: userInfo.bio || '',
                      placeholder: 'Personal bio',
                      buttonText: 'Bio',
                      onSubmit: onSubmitInputModal('bio'),
                    }) : undefined,
                  },
                  {
                    title: 'License Number',
                    icon: Badge2Icon,
                    content: userInfo.licenseNumber || (modal ? 'N/A' : 'Set License Number'),
                    onPress: !modal ? () => setInputModalProps({
                      title: 'License Number',
                      existingValue: userInfo.licenseNumber || '',
                      placeholder: 'License number',
                      buttonText: 'License No.',
                      onSubmit: onSubmitInputModal('licenseNumber'),
                    }) : undefined,
                  },
                  {
                    title: 'Years of Experience',
                    icon: InterestIcon,
                    content: (
                      userInfo.certDate && formatDistanceStrict(new Date(userInfo.certDate), new Date())
                    ) || (modal ? 'N/A' : (
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
                    onPress: !modal ? () => setModals({
                      ...modals,
                      isQualificationModalVisible: true,
                    }) : undefined,
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
