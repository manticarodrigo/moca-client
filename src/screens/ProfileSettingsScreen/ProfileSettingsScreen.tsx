import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import * as WebBrowser from 'expo-web-browser';

import { getImage } from '@src/utlities/imagePicker';

import EditInformationModal from '@src/modals/EditInformationModal';
import ChangePasswordModal from '@src/modals/ChangePasswordModal';
import { updateUser, updateUserImage, logoutUser } from '@src/store/actions/UserAction';


import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Button from '@src/components/Button';
import Card from '@src/components/Card';
import BackButton from '@src/components/BackButton';

import { LogoutIcon } from '@src/components/icons';
import { Views, Colors } from '@src/styles';

import useStore from '@src/hooks/useStore';

const ProfileSettingsScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();

  const [editInfoModalVisible, setEditInfoModalVisible] = useState(false);
  const [isChangePasswordModal, setIsChangePasswordModal] = useState(false);


  const accountSettings = ['changePassword', 'notifications', 'inviteFriends'];
  const supportSettings = ['supportAndFeedback', 'frequentQuestions', 'TermsAndConditions', 'join'];
  const followUs = ['instagram', 'twitter', 'facebook'];

  const sumbitEditPassword = async (password: string) => {
    try {
      await dispatch(updateUser({ password }));
      setIsChangePasswordModal(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleChangePassword = () => {
    setIsChangePasswordModal(true);
  };

  const handleBookmarkPress = () => {

  };

  const onOpenLink = (url: string) => WebBrowser.openBrowserAsync(url);

  const handlePress = (type) => {
    switch (type) {
      case 'changePassword':
        return handleChangePassword();
      case 'bookmark':
        return handleBookmarkPress();
      case 'join':
        return onOpenLink('https://joinmoca.com');
      default:
        return null;
    }
  };

  const onPressLogout = async () => {
    try {
      await dispatch(logoutUser());
    } finally {
      navigation.dangerouslyGetParent().dangerouslyGetParent().dispatch({
        type: NavigationActions.NAVIGATE,
        routeName: 'OnboardingScreen',
      });
    }
  };

  const toggleEditInfoModal = () => setEditInfoModalVisible(!editInfoModalVisible);

  const changePasswordModal = (
    <ChangePasswordModal
      closeInputModal={() => setIsChangePasswordModal(false)}
      isModalVisible={isChangePasswordModal}
      sumbitEditPassword={sumbitEditPassword}
    />
  );

  const onPressImage = () => {
    getImage((response) => {
      if (response.cancelled !== false) return;

      dispatch(updateUserImage(response.uri));
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <EditInformationModal visible={editInfoModalVisible} onClose={toggleEditInfoModal} />

      <View safeArea flex={1} bgColor="lightGrey">

        <View scroll>
          <View alignCenter py={4} bgColor="white">
            <View alignCenter justifyCenter p={4} onPress={onPressImage}>
              <View variant="rounded" width={120} height={120}>
                <Image rounded size={120} uri={store.user.image} />
                <View justifyCenter alignCenter variant="absoluteFill" bgColor="whiteHalfAlpha">
                  <Text
                    style={{
                      textShadowColor: 'rgba(0, 0, 0, 0.75)',
                      textShadowOffset: { width: -1, height: 1 },
                      textShadowRadius: 10,
                    }}
                    variant="semiBold"
                    color="white"
                  >
                    Edit Photo
                  </Text>
                </View>
              </View>
            </View>
            <View my={1} variant="borderBottom" width="90%" bgColor="white">
              <Text variant="light">Name</Text>
              <Text variant="regularDark" pt={1} pb={2}>{store.user.firstName}</Text>
            </View>
            <View my={1} variant="borderBottom" width="90%" bgColor="white">
              <Text variant="light">Last Name</Text>
              <Text variant="regularDark" pt={1} pb={2}>{store.user.lastName}</Text>
            </View>
            <View my={1} width="90%" bgColor="white">
              <Text variant="light">Email Address</Text>
              <Text variant="regularDark" pt={1} pb={2}>{store.user.email}</Text>
            </View>
            <Button
              variant="secondaryShadow"
              onPress={toggleEditInfoModal}
            >
              Edit Information
            </Button>
          </View>
          <View justifyCenter p={3} ml={2}>
            <Text variant="regular">Account</Text>
          </View>
          <View>
            {accountSettings.map((type) => (
              <Card key={type} type={type} onPress={() => handlePress(type)} arrow />
            ))}
          </View>
          <View justifyCenter p={3} ml={2}>
            <Text variant="regular">Support</Text>
          </View>
          <View>
            {supportSettings.map((type) => (
              <Card key={type} type={type} onPress={() => handlePress(type)} arrow />
            ))}
          </View>
          <View justifyCenter p={3} ml={2}>
            <Text variant="regular">Follow Us</Text>
          </View>
          <View>
            {followUs.map((type) => (
              <Card key={type} type={type} onPress={() => handlePress(type)} arrow />
            ))}
          </View>
          <View alignCenter p={3}>
            <Button
              width="100%"
              icon={<LogoutIcon />}
              variant="logout"
              onPress={onPressLogout}
            >
              Logout
            </Button>
          </View>
        </View>
        {changePasswordModal}
      </View>
    </>
  );
};

ProfileSettingsScreen.navigationOptions = ({ navigationOptions }) => ({
  headerTitle: 'Settings',
  headerBackImage: BackButton,
  headerStyle: {
    ...navigationOptions.headerStyle as {},
    ...Views.borderBottom,
    backgroundColor: Colors.white,
  },
  headerTitleStyle: {
    ...navigationOptions.headerTitleStyle as {},
    color: Colors.primary,
  },
});

export default ProfileSettingsScreen;
