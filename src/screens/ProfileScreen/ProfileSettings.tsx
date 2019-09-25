import React from 'react';

import View from '@src/components/View';

import { BackButtonIcon } from '@src/components/icons';
import { Views, Colors } from '@src/styles';

const ProfileSettings = () => (
  <View />
);

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
