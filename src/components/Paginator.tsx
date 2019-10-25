
import React from 'react';
import { PreviousArrowIcon, NextArrowIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

const Paginator = ({ title, subtitle, onPressPrev, onPressNext }) => (
  <View row justifyBetween alignCenter spacing={{ p: 3 }} bgColor="primary">
    <View onPress={onPressPrev}>
      <PreviousArrowIcon />
    </View>
    <View alignCenter>
      <Text variant="boldWhite">{title}</Text>
      <Text variant="regularSmallSemiGreyLighter">{subtitle}</Text>
    </View>
    <View onPress={onPressNext}>
      <NextArrowIcon />
    </View>
  </View>
);

export default Paginator;
