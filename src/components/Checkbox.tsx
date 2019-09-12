import React, { useState, useEffect } from 'react';
import { TouchableHighlight } from 'react-native';

import CheckBoxFilled from '@src/assets/pngs/tickFilled.png';
import CheckBoxEmpty from '@src/assets/pngs/tickEmpty.png';

import View from './View';
import Image from './Image';


type CheckBoxProps = {
  handleCheckBoxClick: (value: string, checked: boolean) => void;
  value: string;
  width: number;
  height: number;
  isChecked?: boolean;
};

const CheckBox = ({
  handleCheckBoxClick,
  value,
  width,
  height,
  isChecked,
}: CheckBoxProps) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      setChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const handleClick = () => {
    handleCheckBoxClick(value, !checked);
    setChecked(!checked);
  };

  return (
    <View>
      <TouchableHighlight
        onPress={() => handleClick()}
        underlayColor="transparent"
      >
        {checked
          ? (
            <Image file={CheckBoxFilled} width={width} height={height} />
          )
          : (
            <Image file={CheckBoxEmpty} width={width} height={height} />
          )}
      </TouchableHighlight>
    </View>
  );
};

export default CheckBox;
