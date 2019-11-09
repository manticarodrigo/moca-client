
import React from 'react';

import { LogoIcon } from './icons';

import View from './View';

const LogoBackground = () => (
  <View row justifyEnd absoluteFill mt={-4} mr={-6}>
    <LogoIcon size={2} />
  </View>
);

export default LogoBackground;
