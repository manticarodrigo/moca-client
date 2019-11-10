import React from 'react';

import { CheckIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

type ToastProps = {
  centered?: boolean;
  children: string;
}

const Toast = ({ centered, children }: ToastProps) => (
  <View
    row
    alignCenter
    bgColor="successLight"
    width="100%"
  >
    <View p={4}>
      <CheckIcon />
    </View>
    <View flex={1} alignCenter={centered} py={4} width="100%">
      <Text variant="semiBoldLarge" color="white" px={2} numberOfLines={3}>{children}</Text>
    </View>
    <View p={4} />
  </View>
);

export default Toast;
