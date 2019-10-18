import React, { useMemo } from 'react';

import { StyleSheet } from 'react-native';
import { Spacing, SpacingProp, Colors } from '@src/styles';

import { ReportIcon, AppointmentIcon, ClockSimpleIcon, DollarIcon } from '@src/components/icons';

import Text from './Text';
import View from './View';

type TagProps = {
  placeholder: string | number;
  icon?: 'report' | 'appointment' | 'clock' | 'dollar';
  type?: 'fill' | 'border' | 'borderLight';
  center?: boolean;
  spacing?: SpacingProp;
}

const Tag = ({ placeholder, icon, type = 'border', center, spacing }: TagProps) => {
  const borderColor = useMemo(() => {
    switch (type) {
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
      width: 70,
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
      spacing={{ px: 2 }}
      bgColor={type === 'fill' ? 'secondary' : null}
      style={styles.view}
    >
      {iconType}
      <Text style={styles.text}>{placeholder}</Text>
    </View>
  );
};

export default Tag;
