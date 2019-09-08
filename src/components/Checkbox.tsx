import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';

import CheckBoxFilled from '@src/assets/pngs/tickFilled.png';
import CheckBoxEmpty from '@src/assets/pngs/tickEmpty.png';

import View from './View';
import Image from './Image';


const CheckBox = ({
  selectedArrayObject,
  checkBoxKey,
  value,
  width,
  height,
  ...viewProps
}) => {
  const [checked, setChecked] = useState(false);

  const toggleState = (Key, checkBoxValue) => {
    setChecked(!checked);
    if (!checked) {
      selectedArrayObject.pushItem({ checkBoxKey: Key, value: checkBoxValue });
    } else {
      selectedArrayObject.getArray()
        .splice(selectedArrayObject.getArray().findIndex((x) => x.checkBoxKey === checkBoxKey), 1);
    }
  };

  return (
    <View {...viewProps}>
      <TouchableHighlight
        onPress={() => toggleState(checkBoxKey, value)}
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
