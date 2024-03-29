import React, { useMemo } from 'react';

import { StyleSheet } from 'react-native';
import { Spacing, SpacingProps, Colors } from '@src/styles';

import { ReportIcon, AppointmentIcon, ClockSimpleIcon, DollarIcon } from '@src/components/icons';

import Text from './Text';
import View from './View';

type TagProps = SpacingProps & {
  placeholder: string | number;
  icon?: 'report' | 'appointment' | 'clock' | 'dollar';
  type?: 'fill' | 'border' | 'borderLight' | 'warning';
  center?: boolean;
}

const Tag = ({ placeholder = '', icon, type = 'border', center, ...restProps }: TagProps) => {
  const [spacing] = Spacing.parseProps(restProps);

  const borderColor = useMemo(() => {
    switch (type) {
      case 'warning':
        return Colors.warning;
      case 'fill':
        return Colors.secondary;
      case 'borderLight':
        return Colors.secondaryLight;
      default:
        return Colors.semiGrey;
    }
  }, [type]);

  const color = useMemo(() => {
    switch (type) {
      case 'warning':
      case 'fill':
        return Colors.white;
      case 'borderLight':
        return Colors.secondaryLight;
      default:
        return Colors.semiGrey;
    }
  }, [type]);

  const styles = useMemo(() => StyleSheet.create({
    view: {
      ...Spacing.getStyles(spacing),
      borderRadius: Spacing.spaceSize[5],
      borderWidth: 1,
      borderColor,
      width: type === 'warning' ? 'auto' : 70,
      height: 25,
    },
    text: {
      ...Spacing.getStyles({ ml: 1 }),
      color,
    },
  }), [borderColor, color, spacing]);

  const iconType = useMemo(() => {
    switch (icon) {
      case 'report':
        return <ReportIcon tint={color} />;
      case 'appointment':
        return <AppointmentIcon tint={color} />;
      case 'clock':
        return <ClockSimpleIcon tint={color} />;
      case 'dollar':
        return <DollarIcon tint={color} />;
      default:
        return null;
    }
  }, [icon, color]);
  return (
    <View
      row
      justifyCenter={center}
      justifyBetween={!center}
      alignCenter
      px={2}
      bgColor={type === 'warning' ? 'warning' : (type === 'fill' && 'secondary') || undefined}
      style={styles.view}
    >
      {iconType}
      <Text style={styles.text}>{placeholder}</Text>
    </View>
  );
};

export default Tag;
