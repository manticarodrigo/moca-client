import React, { useMemo } from 'react';

import {
  StyleSheet,
  ViewStyle,
  View as RNView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  Views,
  Position,
  PositionProp,
  Spacing,
  SpacingProp,
  Shadow,
  ShadowProp,
  Colors,
} from '@src/styles';

type ViewProps = {
  style?: ViewStyle | ViewStyle[];
  safeArea?: boolean;
  scroll?: boolean;
  horizontal?: boolean;
  variant?: keyof typeof Views;
  position?: PositionProp;
  spacing?: SpacingProp;
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
  horizontal,
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
  const ViewType: typeof React.Component = useMemo(() => {
    if (safeArea) return SafeAreaView;
    if (scroll) return ScrollView;
    if (onPress) return TouchableOpacity;

    return RNView;
  }, [safeArea, scroll, onPress]);

  const viewProps = useMemo(() => ({
    ...(scroll && horizontal && { horizontal }),
    ...(onPress && (!safeArea && !scroll) && { onPress }),
  }), [safeArea, scroll, horizontal, onPress]);

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
    <ViewType
      style={[absoluteFill && StyleSheet.absoluteFill, styles.view, style]}
      {...viewProps}
    >
      {children}
    </ViewType>
  );
};

export default View;
