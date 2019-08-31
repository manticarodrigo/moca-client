import React, { useMemo } from 'react';
import { StyleSheet, View as RNView, SafeAreaView, TouchableOpacity } from 'react-native';

import { Views, Position, PositionProp, Spacing, SpacingProp, Shadow, ShadowProp, Colors } from '@src/styles';

type ViewProps = {
  safeArea?: boolean;
  variant?: keyof typeof Views;
  position?: PositionProp;
  spacing?: SpacingProp;
  shadow?: ShadowProp;
  flex?: number;
  row?: boolean;
  column?: boolean;
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
  shadow,
  flex,
  row,
  column,
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

  const direction = useMemo(() => (
    (row && 'row') || (column && 'column')
  ), [row, column]);

  const justify = useMemo(() => (
    (justifyCenter && 'center') || (justifyBetween && 'space-between')
  ), [justifyCenter, justifyBetween]);

  const align = useMemo(() => (
    alignCenter && 'center'
  ), [alignCenter]);

  const styles = useMemo(() => StyleSheet.create({
    view: {
      width,
      height,
      ...Views[variant],
      ...Position.getStyles(position),
      ...Spacing.getStyles(spacing),
      ...Shadow.getStyles(shadow),
      ...(bgColor && { backgroundColor: Colors[bgColor] }),
      ...(flex && { flex }),
      ...(direction && { flexDirection: direction }),
      ...(justify && { justifyContent: justify }),
      ...(align && { alignItems: align }),
    },
  }), [
    variant,
    spacing,
    position,
    shadow,
    direction,
    flex,
    justify,
    align,
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
