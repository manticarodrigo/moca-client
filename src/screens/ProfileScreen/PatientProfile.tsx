import React from 'react';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

import { UserGenderEnum, User } from '@src/services/openapi';
import { updateUser } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';

import {
  RadiusLocationIcon,
  CreditCardIcon,
  DiagnosisIcon,
  ArrowRightIcon,
  GenderIcon,
} from '@src/components/icons';

import View from '@src/components/View';
import GenderToggle from '@src/components/GenderToggle';
import ImagesPreview from '@src/components/ImagesPreview';

import ProfileListCard from './ProfileListCard';

type Props = {
  patient?: User;
  modal?: boolean;
}

const PatientProfile = ({ patient, modal }: Props) => {
  const { store, dispatch } = useStore();
  const navigation = useNavigation();

  const userInfo = !modal ? store.user : patient;


  const onPressAdress = () => {
    navigation.navigate('AddressSettingsScreen');
  };

  const onPressDiagnosis = () => navigation.navigate('DiagnosisScreen');
  const onPressPayment = () => navigation.navigate('WalletScreen');

  const onPressGender = async (type: UserGenderEnum) => {
    try {
      await dispatch(updateUser({ gender: type }));
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <View scroll bgColor="lightGrey">
      <TouchableWithoutFeedback>
        <TouchableHighlight>
          <View flex={1}>
            <ProfileListCard
              readonly={!!modal}
              rows={[
                {
                  title: 'Address',
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
                      existingValue={userInfo.gender}
                      onToggle={onPressGender}
                    />
                  ),
                },
                {
                  title: 'My Injury',
                  subtitle: 'Neck Hernia',
                  icon: <DiagnosisIcon size={0.5} />,
                  content: (
                    <View row alignCenter>
                      <ImagesPreview />
                      <View spacing={{ pl: 3 }}>
                        <ArrowRightIcon />
                      </View>
                    </View>
                  ),
                  onPress: onPressDiagnosis,
                },
                {
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
  );
};

export default PatientProfile;
