import React, { useMemo } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import { Views, Spacing, Position, SpacingProp, Alignment, AlignmentProp, PositionProp, Colors } from '@src/styles';

type FlexProps = {
  flex?: boolean;
  safeArea?: boolean;
  direction?: 'row' | 'column';
  position?: PositionProp;
  variant?: keyof typeof Views;
  alignment?: AlignmentProp;
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
  position,
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
      ...Alignment.get(alignment),
      ...Spacing.get(spacing),
      ...Position.get(position),
    },
  }), [variant, direction, alignment, spacing, position, background]);

  return (
    <FlexView style={styles.flex}>
      {children}
    </FlexView>
  );
};

export default Flex;
