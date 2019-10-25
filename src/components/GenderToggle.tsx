import React, { useState, useEffect } from 'react';

import { UserGenderEnum } from '@src/services/openapi';

import View from './View';
import Text from './Text';

const GenderToggle = ({ readonly, existingValue, onToggle }) => {
  const [gender, setGender] = useState('M');

  const isMale = gender === 'M';
  const isFemale = gender === 'F';

  const maleBgColor = isMale ? 'secondaryLight' : 'white';
  const maleTextColor = isMale ? 'white' : 'secondaryLighter';
  const femaleBgColor = isFemale ? 'secondaryLight' : 'white';
  const femaleTextColor = isFemale ? 'white' : 'secondaryLighter';

  useEffect(() => {
    setGender(existingValue);
  }, [existingValue]);

  const onPressGender = (type: string) => () => {
    onToggle(type);
    setGender(type);
  };

  if (readonly) {
    return (
      <View alignCenter>
        <Text variant="boldDark">
          {existingValue || 'N/A'}
        </Text>
      </View>
    );
  }

  return (
    <View row flex={3} justifyEnd>
      <View
        variant="genderButton"
        bgColor={maleBgColor}
        onPress={onPressGender(UserGenderEnum.M)}
      >
        <Text typography={{ color: maleTextColor }}>Male</Text>
      </View>
      <View
        variant="genderButton"
        bgColor={femaleBgColor}
        onPress={onPressGender(UserGenderEnum.F)}
      >
        <Text typography={{ color: femaleTextColor }}>Female</Text>
      </View>
    </View>
  );
};

export default GenderToggle;
