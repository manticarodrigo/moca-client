import React, { useMemo } from 'react';
import { StyleSheet, ViewStyle, View as RNView, SafeAreaView, ScrollView, TouchableOpacity, Insets } from 'react-native';

import { Views, Position, PositionProp, Spacing, SpacingProp, Shadow, ShadowProp, Colors } from '@src/styles';

type ViewProps = {
  style?: ViewStyle;
  safeArea?: boolean;
  scroll?: boolean;
  variant?: keyof typeof Views;
  position?: PositionProp;
  spacing?: SpacingProp;
  insets?: Insets;
  shadow?: ShadowProp;
  flex?: number;
  wrap?: boolean;
  row?: boolean;
  column?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  justifyEnd?: boolean;
  alignCenter?: boolean;
  alignEnd?: boolean;
  absoluteFill?: boolean;
  width?: string | number;
  height?: string | number;
  bgColor?: keyof typeof Colors;
  children?: JSX.Element | JSX.Element[];
  onPress?: () => void;
};

const View = ({
  style,
  safeArea,
  scroll,
  variant,
  spacing,
  position,
  shadow,
  flex,
  wrap,
  row,
  column,
  justifyCenter,
  justifyBetween,
  justifyEnd,
  alignCenter,
  alignEnd,
  absoluteFill,
  width,
  height,
  bgColor,
  children,
  onPress,
}: ViewProps) => {
  const WrapperType = useMemo(() => onPress ? TouchableOpacity : React.Fragment, [onPress]);
  const wrapperProps = useMemo(() => ({ ...(onPress ? { onPress } : null) }), [onPress]);

  const ViewType = useMemo(() => {
    if (safeArea) return SafeAreaView;
    if (scroll) return ScrollView;

    return RNView;
  }, [safeArea, scroll]);

  const direction = useMemo(() => (
    (row && 'row') || (column && 'column')
  ), [row, column]);

  const justifyContent = useMemo(() => (
    (justifyCenter && 'center')
    || (justifyBetween && 'space-between')
    || (justifyEnd && 'flex-end')
  ), [justifyCenter, justifyBetween, justifyEnd]);

  const alignItems = useMemo(() => (
    (alignCenter && 'center') || (alignEnd && 'flex-end')
  ), [alignCenter, alignEnd]);

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
      ...(wrap && { flexWrap: 'wrap' }),
      ...(direction && { flexDirection: direction }),
      ...(justifyContent && { justifyContent }),
      ...(alignItems && { alignItems }),
    },
  }), [
    variant,
    spacing,
    position,
    shadow,
    direction,
    flex,
    wrap,
    justifyContent,
    alignItems,
    width,
    height,
    bgColor,
  ]);

  return (
    <WrapperType {...wrapperProps}>
      <ViewType style={[absoluteFill && StyleSheet.absoluteFill, styles.view, style]}>
        {children}
      </ViewType>
    </WrapperType>
  );
};

export default View;
