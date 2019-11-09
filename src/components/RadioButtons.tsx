import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Colors } from '@src/styles';

import View from './View';
import Text from './Text';

type Option = {
  label: string;
  value: string;
}

type Props = {
  options: Option[];
  readonly?: boolean;
  existingValue?: string;
  onChange: (value: string) => void;
}

const styles = StyleSheet.create(({
  radioButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.secondaryLighter,
  },
}));

const RadioButtons = ({ options = [], readonly, existingValue, onChange }: Props) => {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected(existingValue);
  }, [existingValue]);

  const onPressOption = (value: string) => () => {
    onChange(value);
    setSelected(value);
  };

  if (readonly) {
    return (
      <View alignCenter>
        <Text variant="semiBold" color="dark">
          {existingValue || 'N/A'}
        </Text>
      </View>
    );
  }

  return (
    <View row flex={3} justifyEnd>
      {options.map(({ label, value }, index) => {
        const isSelected = value === selected;

        return (
          <View
            key={value}
            mr={index < options.length - 1 ? 1 : 0}
            py={2}
            px={3}
            style={styles.radioButton}
            shadow={isSelected ? { blur: 2, alpha: 0.05, color: 'secondaryLight' } : undefined}
            bgColor={isSelected ? 'secondaryLight' : 'white'}
            onPress={onPressOption(value)}
          >
            <Text
              variant={isSelected ? 'semiBold' : 'regular'}
              color={isSelected ? 'white' : 'secondary'}
            >
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default RadioButtons;
