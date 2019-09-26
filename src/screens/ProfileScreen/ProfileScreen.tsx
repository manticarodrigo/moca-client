import React from 'react';

import useStore from '@src/hooks/useStore';

import { LogoIcon, StarsIcon, RightIcon } from '@src/icons';

import { mockImg } from '@src/services/mock';

import Image from '@src/components/Image';
import Text from '@src/components/Text';
import View from '@src/components/View';

import { ScreenProps } from '@src/routes/ProfileStack';

import PatientProfile from './PatientProfile';
import TherapistProfile from './TherapistProfile';

type Props = ScreenProps<'ProfileScreen'>;

const ProfileScreen = ({ navigation }: Props) => {
  navigation.setOptions({ title: 'Profile' });

  const onPressRight = () => navigation.navigate('home');

  const { store } = useStore();
  const isTherapist = store.registrationState.userInformation.type === 'Therapist';

  const name = 'John Connor Jacob'; // TODO: get the real value

  const rating = 1; // TODO: get the real value
  let ratingTag = null;
  if (isTherapist) {
    ratingTag = (
      <View row alignCenter>
        <Text variant="lightTextCenter">{rating.toString()}</Text>
        <StarsIcon number={rating} />
      </View>
    );
  }

  return (
    <View flex={1} bgColor="primary">

      <View row justifyEnd absoluteFill spacing={{ mt: -6, mr: -5 }}>
        <LogoIcon size={2} />
      </View>

      <View row alignCenter justifyCenter height={56} spacing={{ py: 2, mt: 5 }}>
        <View column alignCenter width={271}>
          <Text variant="titleSmallWhite">Profile</Text>
        </View>
        <View column alignEnd onPress={onPressRight}>
          <RightIcon />
        </View>
      </View>

      <View alignCenter justifyCenter spacing={{ pt: 2, pb: 4 }}>
        <View row justifyCenter spacing={{ pt: 4 }}>
          <Image rounded size={80} uri={mockImg} />
          <View column justifyCenter spacing={{ px: 2 }}>
            <Text variant="titleWhite">{name}</Text>
            {ratingTag}
          </View>
        </View>
      </View>

      { isTherapist ? <TherapistProfile /> : <PatientProfile /> }

    </View>
  );
};

export default ProfileScreen;
