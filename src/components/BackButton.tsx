import React from 'react';

import BackButtonIcon from '@src/assets/svgs/left-arrow.svg';

import View from '@src/components/View';

const BackButton = () => (
  <View style={{ zIndex: 50 }} shadow={{ color: 'secondary', blur: 2, alpha: 0.16 }}>
    <BackButtonIcon />
  </View>
);

export default BackButton;
