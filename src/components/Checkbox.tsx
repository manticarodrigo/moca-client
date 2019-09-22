import React from 'react';
import { TouchableHighlight } from 'react-native';

import TickEmptyIcon from '@src/icons/TickEmptyIcon';
import TickFilledIcon from '@src/icons/TickFilledIcon';


import View from './View';

type CheckBoxProps = {
  handleCheckBoxClick: (checked: boolean, index: number) => void;
  isChecked?: boolean;
  index?: number;
};

const CheckBox = ({
  handleCheckBoxClick,
  isChecked,
  index,
}: CheckBoxProps) => {
  const handleClick = () => {
    handleCheckBoxClick(!isChecked, index);
  };

  return (
    <View>
      <TouchableHighlight
        onPress={() => handleClick()}
        underlayColor="transparent"
      >
        {isChecked
          ? (
            <TickFilledIcon />
          )
          : (
            <TickEmptyIcon />
          )}
      </TouchableHighlight>
    </View>
  );
};

export default CheckBox;
