import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';

type Option = {
  label: string;
  value: string;
}

type Props = {
  light?: boolean;
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
}

const SegmentedControl = ({ light, options, selected, onChange }: Props) => (
  <View bgColor={light ? 'white' : 'primary'} alignCenter>
    <View row justifyCenter py={3} px={4}>
      {options.map(({ value, label }, index) => (
        <View
          key={value}
          alignCenter
          flex={1}
          p={2}
          variant={index === 0 ? 'roundedBorderLeft' : 'roundedBorderRight'}
          bgColor={value === selected ? 'secondary' : 'transparent'}
          onPress={value !== selected ? () => onChange(value) : undefined}
        >
          <Text variant="semiBoldLarge" color={value === selected ? 'white' : 'secondary'}>
            {label}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

export default SegmentedControl;
