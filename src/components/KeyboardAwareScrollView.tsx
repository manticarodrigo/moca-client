import React from 'react';

import {
  KeyboardAwareScrollView as RNKeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

import { KEYBOARD_AVOID_SCROLL_OFFSET } from '@src/utlities/constants';

const KeyboardAwareScrollView = ({ children }) => (
  <RNKeyboardAwareScrollView extraHeight={KEYBOARD_AVOID_SCROLL_OFFSET}>
    {children}
  </RNKeyboardAwareScrollView>
);

export default KeyboardAwareScrollView;
