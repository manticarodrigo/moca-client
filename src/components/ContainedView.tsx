import React from 'react';
import { StyleSheet } from 'react-native';

import View from './View';

const styles = StyleSheet.create({
  containedView: {
    maxWidth: 400,
    maxHeight: 600,
  },
});

const ContainedView = ({ children }) => (
  <View column justifyCenter alignCenter flex={1}>
    <View column justifyCenter alignCenter flex={1} style={styles.containedView}>
      {children}
    </View>
  </View>
);

export default ContainedView;
