import React from 'react';

import {
  KeyboardAwareScrollView as RNKeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

import { KEYBOARD_AVOID_SCROLL_OFFSET } from '@src/utlities/constants';

type Props = KeyboardAwareScrollViewProps & {
  children?: JSX.Element | JSX.Element[];
}

const KeyboardAwareScrollView = ({ children, ...rest }: Props) => (
  <RNKeyboardAwareScrollView extraHeight={KEYBOARD_AVOID_SCROLL_OFFSET} {...rest}>
    {children}
  </RNKeyboardAwareScrollView>
);

export default KeyboardAwareScrollView;
