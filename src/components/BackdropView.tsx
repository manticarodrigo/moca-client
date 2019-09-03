import React from 'react';

import { PositionIndex } from '@src/styles';

import useNavigation from '@src/hooks/useNavigation';

import View from './View';
import Button from './Button';
// import Image from './Image';

type BackdropProps = {
  children?: JSX.Element | JSX.Element[];
  pt?: PositionIndex;
};

const BackdropView = ({ children, pt = 3 }: BackdropProps) => {
  const navigation = useNavigation();
  const handleBackdropPress = () => navigation.goBack();

  return (
    <>
      <Button variant="backdrop" onPress={handleBackdropPress} />
      <View variant="backdrop" safeArea column alignCenter position={{ pt }}>
        {children}
      </View>
    </>
  );
};

export default BackdropView;
