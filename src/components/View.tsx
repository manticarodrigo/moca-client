import React, { useMemo } from 'react';
import { StyleSheet, View as RNView, SafeAreaView, TouchableOpacity } from 'react-native';

import { Views, Spacing, SpacingProp, Colors } from '@src/styles';

type ViewProps = {
  safeArea?: boolean;
  variant?: keyof typeof Views;
  spacing?: SpacingProp;
  row?: boolean;
  column?: boolean;
  expand?: boolean;
  center?: boolean;
  centerMainAxis?: boolean;
  centerCrossAxis?: boolean;
  height?: number;
  bgColor?: keyof typeof Colors;
  children: JSX.Element | JSX.Element[];
  onPress?: () => void;
};

const View = ({
  safeArea,
  variant,
  spacing,
  row,
  column,
  expand,
  center,
  centerMainAxis,
  centerCrossAxis,
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
      height,
      ...Spacing.getStyles(spacing),
      ...Views[variant],
      flex: expand && 1,
      flexDirection: ((row && 'row') || (column && 'column')) || null,
      justifyContent: ((center || centerMainAxis) && 'center') || null,
      alignItems: ((center || centerCrossAxis) && 'center') || null,
      backgroundColor: Colors[bgColor],
    },
  }), [
    variant,
    spacing,
    row,
    column,
    expand,
    center,
    centerMainAxis,
    centerCrossAxis,
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
