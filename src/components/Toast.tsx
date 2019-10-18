import React from 'react';
import { Dimensions } from 'react-native';

import { CheckIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

type ToastProps = {
  children: string,
}

const Toast = ({ children }: ToastProps) => (
  <View
    row
    alignCenter
    spacing={{ px: 4 }}
    bgColor="successLight"
    width={Dimensions.get('window').width}
    height="10%"
  >
    <CheckIcon />
    <View>
      <Text variant="boldWhite" spacing={{ ml: 3, px: 6 }}>{children}</Text>
    </View>
  </View >
);

export default Toast;