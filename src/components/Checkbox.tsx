import React from 'react';
import { TouchableHighlight } from 'react-native';

import TickEmptyIcon from '@src/components/icons/TickEmptyIcon';
import TickFilledIcon from '@src/components/icons/TickFilledIcon';


import View from './View';

type Props = {
  index: number;
  value: string;
  checked: boolean;
  onClick: (index: number, value: string, checked: boolean) => void;
};

const CheckBox = ({ index, value, checked, onClick }: Props) => {
  const handleClick = () => onClick(index, value, !checked);

  return (
    <View>
      <TouchableHighlight
        onPress={handleClick}
        underlayColor="transparent"
      >
        {checked ? <TickFilledIcon /> : <TickEmptyIcon />}
      </TouchableHighlight>
    </View>
  );
};

export default CheckBox;
