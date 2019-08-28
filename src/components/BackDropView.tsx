import React from 'react';

import View from './View';
import Backdrop from './Backdrop';
import { PositionIndex } from '@src/styles';


type BackdropProps = {
  children?: JSX.Element | JSX.Element[];
  pt?: PositionIndex;
};

const BackdropView = ({ children, pt = 3 }: BackdropProps) => {

  const handleBackdropPress = () => console.log('go back!');

  return (
    <React.Fragment>
      <Backdrop onPress={handleBackdropPress} />
      <View variant="backdropView" alignment={['column', 'centerY']} position={{ pt: pt }}>
        {children}
      </View>
    </React.Fragment >
  );
};

export default BackdropView;
