import React from 'react';
import { TouchableHighlight } from 'react-native';

import TickEmptyIcon from '@src/components/icons/TickEmptyIcon';
import TickFilledIcon from '@src/components/icons/TickFilledIcon';

import View from './View';

type Props = {
  checked: boolean;
  onChange: (checked?: boolean) => void;
}

const Checkbox = ({ checked, onChange }: Props, ref) => {
  const handleClick = () => onChange(!checked);

  return (
    <View>
      <TouchableHighlight
        ref={ref}
        onPress={handleClick}
        underlayColor="transparent"
      >
        {checked ? <TickFilledIcon /> : <TickEmptyIcon />}
      </TouchableHighlight>
    </View>
  );
};

const CheckboxWithRef = React.forwardRef(Checkbox);

export default CheckboxWithRef;
