import React, { useState } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import EditInformationModal from '@src/modals/EditInformationModal';
import ChangePasswordModal from '@src/modals/ChangePasswordModal';


import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Button from '@src/components/Button';
import Card from '@src/components/Card';

import { BackButtonIcon, LogoutIcon } from '@src/components/icons';
import { Views, Colors } from '@src/styles';

import useStore from '@src/hooks/useStore';

const ProfileSettingsScreen: NavigationStackScreenComponent = () => {
  const { store } = useStore();

  const [isEditInformationModal, setIsEditInformationModal] = useState(false);
  const [isChangePasswordModal, setIsChangePasswordModal] = useState(false);


  const accountSettings = ['changePassword', 'notifications', 'bookmark', 'inviteFriends'];
  const supportSettings = ['supportAndFeedback', 'frequentQuestions', 'TermsAndConditions', 'join'];
  const followUs = ['instagram', 'twitter', 'facebook'];


  const sumbitEditInformation = (userInput) => {
    // api call
    setIsEditInformationModal(false);
  };

  const sumbitEditPassword = (userInput) => {
    // api call
    setIsChangePasswordModal(false);
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

  const editInformationModal = (
    <EditInformationModal
      closeInputModal={() => setIsEditInformationModal(false)}
      isModalVisible={isEditInformationModal}
      sumbitEditInformation={(userInput) => sumbitEditInformation(userInput)}
    />
  );

  const changePasswordModal = (
    <ChangePasswordModal
      closeInputModal={() => setIsChangePasswordModal(false)}
      isModalVisible={isChangePasswordModal}
      // eslint-disable-next-line no-shadow
      sumbitEditPassword={(userInput) => sumbitEditPassword(userInput)}
    />
  );

  return (
    <View safeArea flex={1}>

      <View scroll bgColor="lightGrey">
        <View alignCenter bgColor="white" spacing={{ py: 4 }}>
          <View alignCenter justifyCenter spacing={{ p: 4 }}>
            <Image rounded size={120} />
          </View>
          <View variant="borderBottom" width="90%" bgColor="white" spacing={{ my: 1 }}>
            <Text variant="light">Name</Text>
            <Text variant="regularDark" spacing={{ pt: 1, pb: 2 }}>{store.user.firstName}</Text>
          </View>
          <View variant="borderBottom" width="90%" bgColor="white" spacing={{ my: 1 }}>
            <Text variant="light">Last Name</Text>
            <Text variant="regularDark" spacing={{ pt: 1, pb: 2 }}>{store.user.lastName}</Text>
          </View>
          <View width="90%" bgColor="white" spacing={{ my: 1 }}>
            <Text variant="light">Email Address</Text>
            <Text variant="regularDark" spacing={{ pt: 1, pb: 2 }}>{store.user.email}</Text>
          </View>
          <Button
            variant="secondaryShadow"
            onPress={() => setIsEditInformationModal(true)}
          >
            Edit Information
          </Button>
        </View>
        <View justifyCenter spacing={{ p: 3, ml: 2 }}>
          <Text variant="regularSemiGrey">Account</Text>
        </View>
        <View>
          {accountSettings.map((type) => (
            <Card key={type} type={type} onPress={() => handlePress(type)} arrow />
          ))}
        </View>
        <View justifyCenter spacing={{ p: 3, ml: 2 }}>
          <Text variant="regularSemiGrey">Support</Text>
        </View>
        <View>
          {supportSettings.map((type) => (
            <Card key={type} type={type} onPress={() => handlePress(type)} arrow />
          ))}
        </View>
        <View justifyCenter spacing={{ p: 3, ml: 2 }}>
          <Text variant="regularSemiGrey">Follow Us</Text>
        </View>
        <View>
          {followUs.map((type) => (
            <Card key={type} type={type} onPress={() => handlePress(type)} arrow />
          ))}
        </View>
        <View alignCenter spacing={{ p: 3 }}>
          <Button icon={<LogoutIcon />} variant="logout">Logout</Button>
        </View>
      </View>
      {editInformationModal}
      {changePasswordModal}
    </View>
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
