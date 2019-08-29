import React, { useMemo } from 'react';
import { StyleSheet, View as RNView, SafeAreaView, TouchableOpacity } from 'react-native';

import { Views, Position, PositionProp, Spacing, SpacingProp, Colors } from '@src/styles';

type ViewProps = {
  safeArea?: boolean;
  variant?: keyof typeof Views;
  position?: PositionProp;
  spacing?: SpacingProp;
  row?: boolean;
  column?: boolean;
  expand?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  alignCenter?: boolean;
  width?: string | number;
  height?: string | number;
  bgColor?: keyof typeof Colors;
  children: JSX.Element | JSX.Element[];
  onPress?: () => void;
};

const View = ({
  safeArea,
  variant,
  spacing,
  position,
  row,
  column,
  expand,
  justifyCenter,
  justifyBetween,
  alignCenter,
  width,
  height,
  bgColor,
  children,
  onPress,
}: ViewProps) => {
  const WrapperType = useMemo(() => onPress ? TouchableOpacity : React.Fragment, [onPress]);
  const wrapperProps = useMemo(() => ({ ...(onPress ? { onPress } : null) }), [onPress]);
  const ViewType = useMemo(() => safeArea ? SafeAreaView : RNView, [safeArea]);

  const styles = useMemo(() => StyleSheet.create({
    view: {
      width,
      height,
      ...Views[variant],
      ...Position.getStyles(position),
      ...Spacing.getStyles(spacing),
      flex: expand && 1,
      flexDirection: ((row && 'row') || (column && 'column')) || null,
      justifyContent: (justifyCenter && 'center') || (justifyBetween && 'space-between') || null,
      alignItems: (alignCenter && 'center') || null,
      backgroundColor: Colors[bgColor],
    },
  }), [
    variant,
    spacing,
    position,
    row,
    column,
    expand,
    justifyCenter,
    justifyBetween,
    alignCenter,
    width,
    height,
    bgColor,
  ]);

  return (
    <WrapperType {...wrapperProps}>
      <ViewType style={styles.view}>
        {children}
      </ViewType>
    </WrapperType>
  );
};

export default View;
