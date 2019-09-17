import React, { forwardRef, useMemo } from 'react';
import { StyleSheet, SectionList as RNSectionList, SectionListProps as RNSectionListProps } from 'react-native';

import { Colors, Spacing, SpacingProp } from '@src/styles';

type SectionListProps = RNSectionListProps<any> & {
  spacing?: SpacingProp;
  bgColor?: keyof typeof Colors;
};

const SectionList = ({ spacing, bgColor, ...props }: SectionListProps, ref) => {
  const styles = useMemo(() => StyleSheet.create({
    list: {
      flex: 1,
      ...Spacing.getStyles(spacing),
      ...(bgColor && { backgroundColor: Colors[bgColor] }),
    },
  }), [spacing, bgColor]);

  return <RNSectionList ref={ref} style={styles.list} {...props} />;
};

export default forwardRef(SectionList);
