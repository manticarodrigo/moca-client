import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';

import { LogoIcon, StarsIcon, RightIcon } from '@src/components/icons';

import { mockImg } from '@src/services/mock';

import Image from '@src/components/Image';
import Text from '@src/components/Text';
import View from '@src/components/View';

import PatientProfile from './PatientProfile';
import TherapistProfile from './TherapistProfile';

const ProfileScreen = ({ navigation }: NavigationStackScreenProps) => {
  const onPressRight = () => navigation.navigate('ConversationScreen');

  const { store: { registrationState: { type } } } = useStore();
  const isTherapist = type === 'Therapist';

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
      <TherapistProfile />
      {/* { isTherapist ? <TherapistProfile /> : <PatientProfile /> } */}

    </View>
  );
};

ProfileScreen.navigationOptions = {
  header: null,
};

export default ProfileScreen;
