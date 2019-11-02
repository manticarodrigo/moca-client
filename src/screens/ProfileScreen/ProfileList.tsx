/* eslint-disable react/no-array-index-key */
import React, { useState, useMemo } from 'react';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

import { UserState, Price } from '@src/store/reducers/UserReducer';

import { updateUser, addPrice } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';
import useProfileFields from '@src/hooks/useProfileFields';

import View from '@src/components/View';

import QualificationsModal from '@src/modals/QualificationsModal';
import ReviewsModal from '@src/modals/ReviewsModal';
import InputModal, { Props as InputModalProps } from '@src/modals/InputModal';
import InjuryModal from '@src/modals/InjuryModal';

import ProfilePriceTableCard, { PriceModal } from './ProfilePriceTableCard';
import ProfileListCard from './ProfileListCard';

type Props = {
  user?: UserState;
  readonly?: boolean;
}

const initialModalState = {
  prices: false,
  input: false,
  preferredAilments: false,
  reviewCount: false,
  injury: false,
};

type ModalState = typeof initialModalState;

type UniqueInputModalProps = Omit<InputModalProps, 'visible' | 'onClose'>;

const ProfileList = ({ user, readonly }: Props) => {
  const { store, dispatch } = useStore();
  const navigation = useNavigation();

  const profile = user || store.user;

  const isTherapistProfile = profile.type === 'PT';

  const [modalState, setModalState] = useState<ModalState>(initialModalState);

  const [priceModalProps, setPriceModalProps] = useState();
  const [inputModal, setInputModal] = useState<keyof UserState>();

  const onOpenModal = (key: keyof ModalState) => setModalState(
    (prev) => ({ ...prev, [key]: true }),
  );

  const onCloseModal = (key: keyof ModalState) => () => setModalState(
    (prev) => ({ ...prev, [key]: false }),
  );

  const onChangeGender = async (value?: string) => {
    const gender = value === 'M' ? 'M' : 'F';

    try {
      await dispatch(updateUser({ gender }));
    } catch (error) {
      // console.log(error);
    }
  };

  const onChangeStatus = async (value?: boolean) => {
    const status = value ? 'A' : 'B';

    try {
      await dispatch(updateUser({ status }));
    } catch (error) {
      // console.log(error);
    }
  };


  const onSubmitPriceModal = async (sessionType: Price['sessionType'], price: number) => {
    await dispatch(addPrice(sessionType, price));

    setPriceModalProps(null);
  };

  const onSubmitInputModal = (key: keyof UserState) => async (value: string) => {
    try {
      await dispatch(updateUser({ [key]: value }));

      setInputModal(undefined);
    } catch (error) {
      // console.log(error);
    }
  };

  const onSubmitInjury = async (values) => {
    try {
      await dispatch(updateUser({ injury: values }));

      onCloseModal('injury')();
    } catch (error) {
      // console.log(error);
    }
  };

  const onPressField = (key: keyof UserState) => (value?: string | boolean) => {
    switch (key) {
      // screens
      case 'addresses':
        return navigation.navigate('AddressSettingsScreen');
      case 'payments':
        return navigation.navigate('WalletScreen');

      // toggles
      case 'gender':
        if (typeof value === 'string') {
          return onChangeGender(value);
        }
        return undefined;
      case 'status':
        if (typeof value === 'boolean') {
          return onChangeStatus(value);
        }
        return undefined;

      // custom modals
      case 'injury':
      case 'preferredAilments':
      case 'reviewCount':
        return onOpenModal(key);

      // input modal
      case 'operationRadius':
      case 'bio':
      case 'licenseNumber':
        return setInputModal(key);

      // datepicker
      case 'certDate':
        if (typeof value === 'string') {
          return onSubmitInputModal('certDate')(value);
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const sections = useProfileFields(isTherapistProfile, readonly, profile, onPressField);

  const inputModalProps: UniqueInputModalProps = useMemo(() => {
    switch (inputModal) {
      case 'operationRadius':
        return {
          title: 'Service Area',
          existingValue: profile.operationRadius,
          placeholder: 'Radius (mi)',
          keyboardType: 'number-pad',
          validation: 'number',
          buttonText: 'Radius',
          onSubmit: onSubmitInputModal('operationRadius'),
        };
      case 'bio':
        return {
          multiline: true,
          title: 'Personal Bio',
          existingValue: profile.bio,
          placeholder: 'Personal bio',
          buttonText: 'Bio',
          onSubmit: onSubmitInputModal('bio'),
        };
      case 'licenseNumber':
        return {
          title: 'License Number',
          existingValue: profile.licenseNumber,
          placeholder: 'License number',
          buttonText: 'License No.',
          onSubmit: onSubmitInputModal('licenseNumber'),
        };
      default:
        return undefined;
    }
  }, [profile, inputModal]);

  return (
    <>
      {isTherapistProfile && (
        <>
          <ReviewsModal
            visible={modalState.reviewCount}
            therapist={profile}
            onClose={onCloseModal('reviewCount')}
          />

          {!readonly && (
            <>
              <PriceModal
                {...priceModalProps}
                visible={!!priceModalProps}
                onSubmit={onSubmitPriceModal}
                onClose={() => setPriceModalProps(undefined)}
              />
              <InputModal
                {...inputModalProps}
                buttonActionText
                visible={!!inputModalProps}
                onClose={() => setInputModal(undefined)}
              />
              <QualificationsModal
                visible={modalState.preferredAilments}
                onToggle={onCloseModal('preferredAilments')}
              />
            </>
          )}
        </>
      )}

      {!isTherapistProfile && !readonly && (
        <InjuryModal
          visible={modalState.injury}
          patient={profile}
          onSubmit={onSubmitInjury}
          onClose={onCloseModal('injury')}
        />
      )}

      <View scroll bgColor="lightGrey">
        <TouchableWithoutFeedback>
          <TouchableHighlight>
            <View flex={1} spacing={{ pb: readonly ? 6 : 0 }}>
              <>
                {isTherapistProfile && (
                  <ProfilePriceTableCard
                    readonly={!!readonly}
                    existing={profile.prices}
                    onOpenPriceModal={setPriceModalProps}
                  />
                )}
                {sections.map((props, index) => <ProfileListCard key={index} {...props} />)}
              </>
            </View>
          </TouchableHighlight>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default ProfileList;
