import React, { useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import { fetchUser } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';

import { Colors } from '@src/styles';

import { CogIcon } from '@src/components/icons';

import View from '@src/components/View';
import LogoBackground from '@src/components/LogoBackground';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Rating from '@src/components/Rating';

import ProfileList from './ProfileList';

type Props = NavigationStackScreenProps & { isFocused: boolean }

const ProfileScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store, dispatch } = useStore();

  const isTherapist = store.user.type === 'PT';

  const onPressSettings = () => navigation.navigate('ProfileSettingsScreen');

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchUser());
    }
  }, [isFocused]);

  return (
    <View safeArea flex={1} bgColor="primary">

      <LogoBackground />

      <View row justifyBetween alignCenter width="100%" p={4} pt={3}>
        <View width={32} height={32} />
        <Text variant="semiBoldLarge" color="white">Profile</Text>
        <View onPress={onPressSettings}><CogIcon /></View>
      </View>

      <View row p={4}>
        <Image rounded size={80} uri={store.user.image} />
        <View justifyCenter px={3}>
          <Text variant="title" color="white">
            {`${store.user.firstName} ${store.user.lastName}`}
          </Text>
          {isTherapist && <Rating light rating={store.user.rating} />}
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

export default withNavigationFocus(ProfileScreen);
