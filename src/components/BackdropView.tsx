import React from 'react';

import { PositionIndex } from '@src/styles';

import View from './View';
import Button from './Button';

type BackdropProps = {
  children?: JSX.Element | JSX.Element[];
  pt?: PositionIndex;
};

const BackdropView = ({ children, pt = 3 }: BackdropProps) => {
  const handleBackdropPress = () => console.log('go back!');

  return (
    <>
      <Button variant="backdrop" onPress={handleBackdropPress} />
      <View variant="backdrop" column alignCenter position={{ pt }}>
        {children}
      </View>
    </>
  );
};

export default BackdropView;
