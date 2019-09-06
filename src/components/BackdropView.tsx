import React from 'react';

import { PositionIndex } from '@src/styles';

import useNavigation from '@src/hooks/useNavigation';

import arrow from '@src/assets/pngs/arrow.png';

import View from './View';
import Button from './Button';
import Image from './Image';

type BackdropProps = {
  children?: JSX.Element | JSX.Element[];
  pt?: PositionIndex;
  hasArrow?: boolean;
};

const BackdropView = ({ children, pt = 3, hasArrow }: BackdropProps) => {
  const navigation = useNavigation();
  const handleBackdropPress = () => navigation.goBack();

  return (
    <>
      <Button variant="backdrop" onPress={handleBackdropPress} />
      <View variant="backdrop" safeArea column alignCenter position={{ pt }}>
        <View alignCenter spacing={{ mt: 2 }}>
          {hasArrow && <Image file={arrow} width={40} height={8} />}
        </View>
        <View alignCenter width="100%">
          {children}
        </View>
      </View>
    </>
  );
};

export default BackdropView;
