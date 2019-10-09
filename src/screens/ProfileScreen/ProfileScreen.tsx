import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';

import { LogoIcon, StarsIcon, RightIcon } from '@src/components/icons';

import { mockImg } from '@src/services/mock';

import Image from '@src/components/Image';
import Text from '@src/components/Text';
import View from '@src/components/View';

import PatientProfile from './PatientProfile';
import TherapistProfile from './TherapistProfile';

const ProfileScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const onPressRight = () => navigation.navigate('ProfileSettingsScreen');

  const { store } = useStore();
  const isTherapist = store.user.type === 'caregiver';

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
    <View safeArea flex={1} bgColor="primary">

      <View row justifyEnd absoluteFill spacing={{ mt: -6, mr: -5 }}>
        <LogoIcon size={2} />
      </View>

      <View row justifyBetween alignCenter width="100%" spacing={{ p: 4, pt: 3 }}>
        <View width={32} height={32} />
        <Text variant="titleSmallWhite">Profile</Text>
        <View onPress={onPressRight}><RightIcon /></View>
      </View>

      <View row spacing={{ p: 4 }}>
        <Image rounded size={80} uri={mockImg} />
        <View column justifyCenter spacing={{ px: 3 }}>
          <Text variant="titleWhite">{store.user.username}</Text>
          {ratingTag}
        </View>
      </View>
      { isTherapist ? <TherapistProfile /> : <PatientProfile /> }

    </View>
  );
};

ProfileScreen.navigationOptions = {
  header: null,
};

export default ProfileScreen;
