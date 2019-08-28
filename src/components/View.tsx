import React, { useMemo } from 'react';
import { StyleSheet, View as RNView, SafeAreaView } from 'react-native';

import { Views, Alignment, AlignmentProp, Spacing, SpacingProp, Colors } from '@src/styles';

type ViewProps = {
  safeArea?: boolean;
  variant?: keyof typeof Views;
  alignment?: AlignmentProp;
  spacing?: SpacingProp;
  background?: keyof typeof Colors;
  children: JSX.Element | JSX.Element[];
};

const View = ({
  safeArea,
  variant,
  alignment,
  spacing,
  position,
  background = 'white',
  children,
}: ViewProps) => {
  const ViewType = useMemo(() => safeArea ? SafeAreaView : RNView, [safeArea]);

  const styles = useMemo(() => StyleSheet.create({
    view: {
      backgroundColor: Colors[background],
      ...Views[variant],
      ...Alignment.get(alignment),
      ...Spacing.get(spacing),
      ...Position.get(position),
    },
  }), [variant, alignment, spacing, background]);

  return (
    <ViewType style={styles.view}>
      {children}
    </ViewType>
  );
};

export default View;
