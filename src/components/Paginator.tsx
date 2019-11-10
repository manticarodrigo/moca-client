
import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { PreviousArrowIcon, NextArrowIcon } from '@src/components/icons';

import { Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';

const Paginator = ({ title, subtitle, loading, onPressPrev, onPressNext }) => (
  <View row justifyBetween alignCenter p={3} bgColor="primary">

    <TouchableOpacity
      activeOpacity={loading ? 0.5 : undefined}
      disabled={loading}
      onPress={onPressPrev}
    >
      <PreviousArrowIcon />
    </TouchableOpacity>

    <View alignCenter>
      <Text mb={1} variant="semiBoldLarge" color="white">{title}</Text>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 1 }} color={Colors.secondaryLighter} />
      ) : (
        <Text mt={1} variant="regularSmall" color="secondaryLighter">{subtitle}</Text>
      )}
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

export default React.memo(Paginator);
