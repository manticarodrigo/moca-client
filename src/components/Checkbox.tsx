import React from 'react';
import { TouchableHighlight } from 'react-native';

import TickEmptyIcon from '@src/components/icons/TickEmptyIcon';
import TickFilledIcon from '@src/components/icons/TickFilledIcon';


import View from './View';

type Props = {
  value: string;
  isChecked: boolean;
  onClick: (checked: boolean, value: string) => void;
};

const CheckBox = ({ value, isChecked, onClick }: Props) => {
  const handleClick = () => onClick(!isChecked, value);

  return (
    <View>
      <TouchableHighlight
        onPress={handleClick}
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
