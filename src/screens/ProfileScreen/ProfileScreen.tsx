import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';

import { StarsIcon, CogIcon } from '@src/components/icons';

import { mockImg } from '@src/services/mock';

import { Colors } from '@src/styles';

import Image from '@src/components/Image';
import Text from '@src/components/Text';
import View from '@src/components/View';
import LogoBackground from '@src/components/LogoBackground';

import ProfileList from './ProfileList';

const ProfileScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store } = useStore();

  const isTherapist = store.user.type === 'PT';

  const onPressSettings = () => navigation.navigate('ProfileSettingsScreen');

  return (
    <View safeArea flex={1} bgColor="primary">

      <LogoBackground />

      <View row justifyBetween alignCenter width="100%" spacing={{ p: 4, pt: 3 }}>
        <View width={32} height={32} />
        <Text variant="titleSmallWhite">Profile</Text>
        <View onPress={onPressSettings}><CogIcon /></View>
      </View>

      <View row spacing={{ p: 4 }}>
        <Image rounded size={80} uri={mockImg} />
        <View column justifyCenter spacing={{ px: 3 }}>
          <Text variant="titleWhite">{`${store.user.firstName} ${store.user.lastName}`}</Text>
          {isTherapist && (
            <View row alignCenter>
              <Text spacing={{ mr: 2 }} variant="lightTextCenter">{store.user.rating}</Text>
              <StarsIcon number={store.user.rating} />
            </View>
          )}
        </View>
      </View>

      <ProfileList />
    </View>
  );
};

ProfileScreen.navigationOptions = ({ navigationOptions }) => ({
  header: null,
  headerStyle: {
    ...navigationOptions.headerStyle as {},
    backgroundColor: Colors.white,
  },
});

export default ProfileScreen;
