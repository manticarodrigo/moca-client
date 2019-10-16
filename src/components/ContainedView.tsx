import React from 'react';
import { StyleSheet } from 'react-native';

import View from './View';

const styles = StyleSheet.create({
  containedView: {
    maxWidth: 500,
    maxHeight: 700,
  },
});

const ContainedView = ({ children }) => (
  <View justifyCenter alignCenter flex={1}>
    <View flex={1} style={styles.containedView}>
      {children}
    </View>
  </View>
);

export default ContainedView;
