
import React from 'react';

import { LogoIcon } from './icons';

import View from './View';

const LogoBackground = () => (
  <View row justifyEnd absoluteFill spacing={{ mt: -6, mr: -5 }}>
    <LogoIcon size={2} />
  </View>
);

export default LogoBackground;
