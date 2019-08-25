import React, { useMemo } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import { Views, Spacing, SpacingProp, Alignment, Colors } from '@src/styles';

type FlexProps = {
  flex?: boolean;
  safeArea?: boolean;
  direction?: 'row' | 'column';
  variant?: keyof typeof Views;
  alignment?: keyof typeof Alignment;
  spacing?: SpacingProp;
  background?: keyof typeof Colors;
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
      backgroundColor: Colors[background],
      ...Views[variant],
      ...Alignment[alignment],
      ...Spacing.get(spacing),
    },
  }), [variant, direction, alignment, spacing, background]);

  return (
    <FlexView style={styles.flex}>
      {children}
    </FlexView>
  );
};

export default Flex;
