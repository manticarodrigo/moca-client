/* eslint-disable react/no-array-index-key */
import React, { useState, useMemo } from 'react';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

import { UserState, Price } from '@src/store/reducers/UserReducer';

import { updateUser, addPrice, updatePrice } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';
import useProfileFields from '@src/hooks/useProfileFields';

import QualificationsModal from '@src/modals/QualificationsModal';
import DaysOffModal from '@src/modals/DaysOffModal';
import ReviewsModal from '@src/modals/ReviewsModal';
import InputModal, { Props as InputModalProps } from '@src/modals/InputModal';
import InjuriesModal from '@src/modals/InjuriesModal';

import View from '@src/components/View';
import Toast from '@src/components/Toast';

import ProfilePriceTableCard, { PriceModal } from './ProfilePriceTableCard';
import ProfileListCard from './ProfileListCard';

type Props = {
  user?: UserState;
  readonly?: boolean;
}

const initialModalState = {
  prices: false,
  awayDays: false,
  reviewCount: false,
  preferredAilments: false,
  injuries: false,
};

type ModalState = typeof initialModalState;

type UniqueInputModalProps = Omit<InputModalProps, 'visible' | 'onClose'>;

const ProfileList = ({ user, readonly }: Props) => {
  const { store, dispatch } = useStore();
  const navigation = useNavigation();
  const [modalState, setModalState] = useState<ModalState>(initialModalState);
  const [priceModalProps, setPriceModalProps] = useState();
  const [inputModal, setInputModal] = useState<keyof UserState>();
  const [activeToast, setActiveToast] = useState<'success' | 'error'>();

  const profile = user || store.user;

  const isTherapistProfile = profile.type === 'PT';

  const submitUserUpdate = async (update: UserState) => {
    try {
      await dispatch(updateUser(update));
      setActiveToast('success');
      return Promise.resolve();
    } catch {
      setActiveToast('error');
      return Promise.resolve();
    }
  };

  const onOpenModal = (key: keyof ModalState) => setModalState(
    (prev) => ({ ...prev, [key]: true }),
  );

  const onCloseModal = (key: keyof ModalState) => () => setModalState(
    (prev) => ({ ...prev, [key]: false }),
  );

  const onChangeGender = (value?: string) => submitUserUpdate(
    { gender: value === 'M' ? 'M' : 'F' },
  );

  const onChangeStatus = (value?: boolean) => submitUserUpdate(
    { status: value ? 'A' : 'B' },
  );

  const onSubmitPriceModal = async (sessionType: Price['sessionType'], price: number) => {
    try {
      const existing = store.user.prices.find((p) => p.sessionType === sessionType);

      if (existing) {
        await dispatch(updatePrice(existing.id, { sessionType, price }));
      } else {
        await dispatch(addPrice(sessionType, price));
      }
      await setActiveToast('success');
    } catch {
      setActiveToast('error');
    } finally {
      setPriceModalProps(null);
    }
  };

  const onSubmitInputModal = (key: keyof UserState) => async (value: string) => {
    await submitUserUpdate({ [key]: value });
    setInputModal(undefined);
  };

  const onCloseInputModal = () => setInputModal(undefined);

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
      case 'awayDays': case 'reviewCount': case 'preferredAilments':
        return onOpenModal(key);

      case 'injuries':
        if (readonly) return onOpenModal(key);
        return navigation.navigate('InjuriesScreen');

      // input modal
      case 'operationRadius': case 'bio': case 'licenseNumber':
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
  }, [inputModal, profile]);

  return (
    <>
      {isTherapistProfile && (
        <>
          <DaysOffModal
            visible={modalState.awayDays}
            therapist={profile}
            onClose={onCloseModal('awayDays')}
          />

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
                visible={!!inputModal}
                onClose={onCloseInputModal}
              />
              <QualificationsModal
                visible={modalState.preferredAilments}
                onToggle={onCloseModal('preferredAilments')}
              />
            </>
          )}
        </>
      )}

      {!isTherapistProfile && readonly && (
        <InjuriesModal
          visible={modalState.injuries}
          patient={profile}
          onClose={onCloseModal('injuries')}
        />
      )}

      {!!activeToast && (
        <Toast error={activeToast === 'error'} onClose={() => setActiveToast(undefined)}>
          {activeToast === 'success' ? 'Update successful.' : 'Update failed.'}
        </Toast>
      )}

      <View scroll bgColor="lightGrey">
        <TouchableWithoutFeedback>
          <TouchableHighlight>
            <View flex={1} pb={readonly ? 6 : 0}>
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
