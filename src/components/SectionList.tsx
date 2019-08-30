import React from 'react';
import { StyleSheet, SectionList as RNSectionList, SectionListProps as RNSectionListProps } from 'react-native';

import { Colors } from '@src/styles';

type SectionListProps = RNSectionListProps<any> & {};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
});

const SectionList = (props: SectionListProps) => <RNSectionList style={styles.list} {...props} />;

export default SectionList;
