import React, { forwardRef, useMemo } from 'react';
import { StyleSheet, SectionList as RNSectionList, SectionListProps as RNSectionListProps } from 'react-native';

import { Colors, Spacing, SpacingProp } from '@src/styles';

type SectionListProps = RNSectionListProps<any> & {
  spacing?: SpacingProp;
};

const SectionList = ({ spacing, ...props }: SectionListProps, ref) => {
  const styles = useMemo(() => StyleSheet.create({
    list: {
      ...Spacing.getStyles(spacing),
      flex: 1,
      backgroundColor: Colors.lightGrey,
    },
  }), [spacing]);

  return <RNSectionList ref={ref} style={styles.list} {...props} />;
};

export default forwardRef(SectionList);
