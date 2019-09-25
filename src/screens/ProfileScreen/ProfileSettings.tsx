import React, { useState } from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Button from '@src/components/Button';
import Card from '@src/components/Card';

import { BackButtonIcon } from '@src/components/icons';
import { Views, Colors } from '@src/styles';

const ProfileSettings = () => {

  const [firstName, setFirstName] = useState('John Connor');
  const [lastName, setLastName] = useState('Jacob');
  const [email, setEmail] = useState('john@gmail.com');


  return (
    <View scroll bgColor="semiGreyLighter">
      <View alignCenter bgColor="white" spacing={{ py: 4 }}>
        <View alignCenter justifyCenter spacing={{ p: 4 }}>
          <Image rounded size={120} />
        </View>
        <View variant="borderBottom" width="90%" bgColor="white" spacing={{ my: 1 }}>
          <Text variant="regular">Name</Text>
          <Text variant="regularDark" spacing={{ pt: 1, pb: 2 }}>{firstName}</Text>
        </View>
        <View variant="borderBottom" width="90%" bgColor="white" spacing={{ my: 1 }}>
          <Text variant="regular">Last Name</Text>
          <Text variant="regularDark" spacing={{ pt: 1, pb: 2 }}>{lastName}</Text>
        </View>
        <View width="90%" bgColor="white" spacing={{ my: 1 }}>
          <Text variant="regular">Email Address</Text>
          <Text variant="regularDark" spacing={{ pt: 1, pb: 2 }}>{email}</Text>
        </View>
        <Button variant="secondary">Edit Information</Button>
      </View>
      <View justifyCenter spacing={{ p: 4 }}>
        <Text variant="regularLarge">Name</Text>
      </View>
      <View>
        <Card type="s" />
      </View>
    </View>
  );

};

const SettingsBackButton = (
  <View shadow={{ color: 'secondary', blur: 2, alpha: 0.16 }}>
    <BackButtonIcon />
  </View>
);

ProfileSettings.navigationOptions = () => ({
  headerTitle: 'Settings',
  headerBackImage: SettingsBackButton,
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});

export default ProfileSettings;
