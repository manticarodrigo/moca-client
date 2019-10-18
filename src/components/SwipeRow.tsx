import React from 'react';
import { SwipeRow as RNSwipeRow } from 'react-native-swipe-list-view';

import { BinIcon } from './icons';

import View from './View';

const BinRow = ({ onPress }) => (
  <View
    row
    flex={1}
    width="100%"
    alignCenter
    spacing={{ p: 4 }}
    bgColor="error"
    onPress={onPress}
  >
    <BinIcon />
  </View>
);

const SwipeRow = ({ children, disabled, onPress }) => (
  <RNSwipeRow
    preview
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
