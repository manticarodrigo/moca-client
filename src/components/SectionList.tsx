import React, { forwardRef, useMemo } from 'react';
import {
  StyleSheet,
  SectionList as RNSectionList,
  SectionListProps as RNSectionListProps,
} from 'react-native';

import { Colors, Spacing, SpacingProp } from '@src/styles';

type SectionListProps<Item> = RNSectionListProps<Item> & {
  spacing?: SpacingProp;
  bgColor?: keyof typeof Colors;
};

function SectionList<Item>({ spacing, bgColor, ...props }: SectionListProps<Item>, ref) {
  const styles = useMemo(() => StyleSheet.create({
    list: {
      flex: 1,
      ...Spacing.getStyles(spacing),
      ...(bgColor && { backgroundColor: Colors[bgColor] }),
    },
  }), [spacing, bgColor]);

  return <RNSectionList ref={ref} style={styles.list} {...props} />;
}

export default forwardRef(SectionList);
