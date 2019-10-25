import React, { useState, useEffect } from 'react';

import { SwitchIcon } from '@src/components/icons';

import Text from '@src/components/Text';
import View from '@src/components/View';

type Props = {
  onLabel: string;
  offLabel: string;
  existingValue?: boolean;
  onToggle?: (isOn: boolean) => void;
}

const Toggle = ({ onLabel, offLabel, existingValue, onToggle }: Props) => {
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    setIsOn(existingValue);
  }, [existingValue]);


  const onPress = () => {
    onToggle(!isOn);
    setIsOn(!isOn);
  };

  return (
    <View row justifyCenter>
      <View justifyCenter>
        {isOn ? (
          <Text spacing={{ mr: 2 }} variant="regularSmallSuccess">{onLabel}</Text>
        ) : (
          <Text spacing={{ mr: 2 }} variant="regularSmallGrey">{offLabel}</Text>
        )}
      </View>
      <View onPress={onPress}>
        <SwitchIcon isOn={isOn} />
      </View>
    </View>
  );
};

export default Toggle;
