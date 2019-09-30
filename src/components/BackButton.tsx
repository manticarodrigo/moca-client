import React from 'react';

import { BackButtonIcon } from '@src/components/icons';

import View from '@src/components/View';

const BackButton = () => (
  <View shadow={{ color: 'secondary', blur: 2, alpha: 0.16 }}>
    <BackButtonIcon />
  </View>
);

export default BackButton;
