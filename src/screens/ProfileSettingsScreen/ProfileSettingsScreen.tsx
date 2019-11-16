import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { getImage } from '@src/utlities/imagePicker';

import EditInformationModal from '@src/modals/EditInformationModal';
import ChangePasswordModal from '@src/modals/ChangePasswordModal';
import { updateUser, updateUserImage, logoutUser } from '@src/store/actions/UserAction';


import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Button from '@src/components/Button';
import Card from '@src/components/Card';

import { BackButtonIcon, LogoutIcon } from '@src/components/icons';
import { Views, Colors } from '@src/styles';

import useStore from '@src/hooks/useStore';

const ProfileSettingsScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();

  const [editInfoModalVisible, setEditInfoModalVisible] = useState(false);
  const [isChangePasswordModal, setIsChangePasswordModal] = useState(false);


  const accountSettings = ['changePassword', 'notifications', 'bookmark', 'inviteFriends'];
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

  const handlePress = (type) => {
    switch (type) {
      case 'changePassword':
        return handleChangePassword();
      case 'bookmark':
        return handleBookmarkPress();
      default:
        return null;
    }
  };

  const onPressLogout = async () => {
    await dispatch(logoutUser());

    navigation.dangerouslyGetParent().dangerouslyGetParent().dispatch({
      type: NavigationActions.NAVIGATE,
      routeName: 'OnboardingScreen',
    });
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
              <Image rounded size={120} uri={store.user.image} />
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

const SettingsBackButton = () => (
  <View shadow={{ color: 'secondary', blur: 2, alpha: 0.16 }}>
    <BackButtonIcon />
  </View>
);

ProfileSettingsScreen.navigationOptions = ({ navigationOptions }) => ({
  headerTitle: 'Settings',
  headerBackImage: SettingsBackButton,
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
