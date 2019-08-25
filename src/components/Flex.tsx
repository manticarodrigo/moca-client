import React, { useMemo } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import { theme } from '@src/theme';
import { Spacing, Alignment } from '@src/styles';
import { SpacingProp } from '@src/styles/spacing';

const Variant = {
  chatInputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
  },
};

type FlexProps = {
  flex?: boolean;
  safeArea?: boolean;
  direction?: 'row' | 'column';
  variant?: keyof typeof Variant;
  alignment?: keyof typeof Alignment;
  spacing?: SpacingProp;
  background?: keyof typeof theme.colors;
  children: JSX.Element | JSX.Element[];
};

const Flex = ({
  safeArea,
  variant,
  direction = 'row',
  alignment,
  spacing,
  background = 'white',
  children,
}: FlexProps) => {
  const FlexView = useMemo(() => safeArea ? SafeAreaView : View, [safeArea]);

  const styles = useMemo(() => StyleSheet.create({
    flex: {
      display: 'flex',
      flexDirection: direction,
      backgroundColor: theme.colors[background],
      ...Variant[variant],
      ...Alignment[alignment],
      ...Spacing.get(spacing),
    },
  }), [variant, alignment, spacing]);

  return (
    <FlexView style={styles.flex}>
      {children}
    </FlexView>
  );
};

export default Flex;
