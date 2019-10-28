
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { PreviousArrowIcon, NextArrowIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

const Paginator = ({ title, subtitle, loading, onPressPrev, onPressNext }) => (
  <View row justifyBetween alignCenter spacing={{ p: 3 }} bgColor="primary">

    <TouchableOpacity
      activeOpacity={loading ? 0.5 : undefined}
      disabled={loading}
      onPress={onPressPrev}
    >
      <PreviousArrowIcon />
    </TouchableOpacity>

    <View alignCenter>
      <Text variant="boldWhite">{title}</Text>
      <Text variant="regularSmallSemiGreyLighter">{subtitle}</Text>
    </View>

    <TouchableOpacity
      activeOpacity={loading ? 0.5 : undefined}
      disabled={loading}
      onPress={onPressNext}
    >
      <NextArrowIcon />
    </TouchableOpacity>
  </View>
);

export default Paginator;
