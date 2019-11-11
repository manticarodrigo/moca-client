import React, { useMemo, useEffect } from 'react';

import { Animated } from 'react-native';

import { CheckIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

type ToastProps = {
  centered?: boolean;
  error?: boolean;
  seconds?: number;
  onClose: () => void;
  children: string;
}

const Toast = ({ centered, error, seconds = 2, onClose, children }: ToastProps) => {
  const animatedValue = useMemo(() => new Animated.Value(0), []);

  const onHide = () => {
    Animated.timing(animatedValue, {
      delay: (seconds * 1000) / 2,
      toValue: 0,
      duration: (seconds * 1000) / 4,
    }).start(onClose);
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: (seconds * 1000) / 4,
    }).start(onHide);
  }, []);

  return (
    <Animated.View
      style={{
        zIndex: 2,
        opacity: animatedValue,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <View
        row
        alignCenter
        bgColor={error ? 'error' : 'success'}
        width="100%"
      >
        <View py={3} px={4}>
          <CheckIcon />
        </View>
        <View flex={1} alignCenter={centered} py={4} width="100%">
          <Text variant="semiBoldLarge" color="white" px={2} numberOfLines={3}>{children}</Text>
        </View>
        <View py={3} px={4} />
      </View>
    </Animated.View>
  );
};

export default Toast;
