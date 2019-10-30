import React, { useMemo, useState } from 'react';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

import { UserState } from '@src/store/reducers/UserReducer';

import { updateUser } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';

import {
  RadiusLocationIcon,
  CreditCardIcon,
  InjuryIcon,
  ArrowRightIcon,
  GenderIcon,
} from '@src/components/icons';

import View from '@src/components/View';
import GenderToggle from '@src/components/GenderToggle';
import ImageSelector from '@src/components/ImageSelector';

import FormModal from '@src/modals/FormModal';

import ProfileListCard from './ProfileListCard';

type Props = {
  patient?: UserState;
  modal?: boolean;
}

const PatientProfile = ({ patient, modal }: Props) => {
  const { store, dispatch } = useStore();
  const navigation = useNavigation();

  const userInfo = !modal ? store.user : patient;

  const { firstName, addresses, gender } = userInfo;

  const injury = userInfo.injury || {
    title: '',
    description: '',
    images: [],
  };

  const [injuryModalVisible, setInjuryModalVisible] = useState(false);

  const onPressAdress = () => {
    navigation.navigate('AddressSettingsScreen');
  };

  const onPressGender = async (type: UserState['gender']) => {
    try {
      await dispatch(updateUser({ gender: type }));
    } catch (error) {
      // console.log(error);
    }
  };

  const { primaryAddress } = useMemo(() => ({
    primaryAddress: addresses.find(({ primary }) => primary),
  }), [addresses]);

  const onToggleInjuryModal = () => setInjuryModalVisible(!injuryModalVisible);

  const onSubmitInjury = async (values) => {
    try {
      await dispatch(updateUser({ injury: values }));
    } catch (error) {
      // console.log(error);
    }
  };

  const onPressPayment = () => navigation.navigate('WalletScreen');

  return (
    <>
      {!modal && (
        <FormModal
          visible={injuryModalVisible}
          fieldConfig={{
            title: {
              value: injury.title,
              placeholder: 'Title',
            },
            description: {
              value: injury.description,
              placeholder: 'Description',
              multiline: true,
            },
          }}
          images={injury.images}
          title={`${firstName}'s Injury`}
          submitText="Save Injury"
          onSubmit={onSubmitInjury}
          onClose={onToggleInjuryModal}
        />
      )}

      <View scroll bgColor="lightGrey">
        <TouchableWithoutFeedback>
          <TouchableHighlight>
            <View flex={1}>
              <ProfileListCard
                readonly={!!modal}
                rows={[
                  {
                    title: 'Address',
                    subtitle: (primaryAddress || {}).street,
                    icon: RadiusLocationIcon,
                    content: <ArrowRightIcon />,
                    onPress: onPressAdress,
                  },
                  {
                    title: 'Gender',
                    icon: GenderIcon,
                    content: (
                      <GenderToggle
                        readonly={!!modal}
                        existingValue={gender}
                        onToggle={onPressGender}
                      />
                    ),
                  },
                  {
                    title: 'My Injury',
                    subtitle: injury.title || ((!modal && 'Add Injury') || 'N/A'),
                    icon: <InjuryIcon size={0.5} />,
                    content: (
                      <View row alignCenter>
                        <ImageSelector images={injury.images} />
                        <View spacing={{ pl: 3 }}>
                          <ArrowRightIcon />
                        </View>
                      </View>
                    ),
                    onPress: !modal && onToggleInjuryModal,
                  },
                  {
                    hideOnReadonly: true,
                    title: 'Payment Method',
                    subtitle: 'Add Payment Method',
                    icon: CreditCardIcon,
                    content: <ArrowRightIcon />,
                    onPress: onPressPayment,
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

export default PatientProfile;
