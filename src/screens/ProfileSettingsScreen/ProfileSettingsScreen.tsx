import React, { useState } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Button from '@src/components/Button';
import Card from '@src/components/Card';

import { BackButtonIcon, LogoutIcon } from '@src/components/icons';
import { Views, Colors } from '@src/styles';

const ProfileSettingsScreen: NavigationStackScreenComponent = () => {
  const [firstName, setFirstName] = useState('John Connor');
  const [lastName, setLastName] = useState('Jacob');
  const [email, setEmail] = useState('john@gmail.com');

  const accountSettings = ['changePassword', 'notifications', 'bookmark', 'inviteFriends'];
  const supportSettings = ['supportAndFeedback', 'frequentQuestions', 'TermsAndConditions', 'join'];
  const followUs = ['instagram', 'twitter', 'facebook'];

  const handleChangePassword = () => {
    setFirstName('Ahmed');
  };

  const handlePress = (type) => {
    switch (type) {
      case 'changePassword':
        return handleChangePassword();
      default:
        return null;
    }
  };

  return (
    <View safeArea flex={1}>

      <View scroll bgColor="lightGrey">
        <View alignCenter bgColor="white" spacing={{ py: 4 }}>
          <View alignCenter justifyCenter spacing={{ p: 4 }}>
            <Image rounded size={120} />
          </View>
          <View variant="borderBottom" width="90%" bgColor="white" spacing={{ my: 1 }}>
            <Text variant="light">Name</Text>
            <Text variant="regularDark" spacing={{ pt: 1, pb: 2 }}>{firstName}</Text>
          </View>
          <View variant="borderBottom" width="90%" bgColor="white" spacing={{ my: 1 }}>
            <Text variant="light">Last Name</Text>
            <Text variant="regularDark" spacing={{ pt: 1, pb: 2 }}>{lastName}</Text>
          </View>
          <View width="90%" bgColor="white" spacing={{ my: 1 }}>
            <Text variant="light">Email Address</Text>
            <Text variant="regularDark" spacing={{ pt: 1, pb: 2 }}>{email}</Text>
          </View>
          <Button variant="secondaryShadow">Edit Information</Button>
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
