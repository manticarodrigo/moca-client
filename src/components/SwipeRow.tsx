import React from 'react';
import { SwipeRow as RNSwipeRow } from 'react-native-swipe-list-view';

import { BinIcon } from './icons';

import View from './View';

const BinRow = ({ onPress }) => (
  <View
    row
    alignCenter
    flex={1}
    p={4}
    width="100%"
    bgColor="error"
    onPress={onPress}
  >
    <BinIcon />
  </View>
);

type Props = {
  children: JSX.Element | JSX.Element[];
  disabled: boolean;
  onPress?: () => void;
}

const SwipeRow = ({ children, disabled, onPress }: Props) => (
  <RNSwipeRow
    disableLeftSwipe
    disableRightSwipe={disabled}
    previewOpenValue={80}
    leftOpenValue={80}
    onRowPress={onPress}
  >
    {children}
  </RNSwipeRow>
);

export {
  BinRow,
};

export default SwipeRow;
