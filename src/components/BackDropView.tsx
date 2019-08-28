import React from 'react';

import Flex from './Flex';
import BackDrop from './BackDrop';
import { PositionIndex } from '@src/styles';


type BackDropProps = {
  children?: JSX.Element | JSX.Element[];
  pt?: PositionIndex;
};

const BackDropView = ({ children, pt = 3 }: BackDropProps) => {

  const handleBackDropPress = () => console.log('go back!');

  return (
    <React.Fragment>
      <BackDrop onPress={handleBackDropPress} />
      <Flex variant="backDropView" position={{ pt: pt }}>
        {children}
      </Flex>
    </React.Fragment >
  );
};

export default BackDropView;
