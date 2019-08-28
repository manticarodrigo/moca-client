import React from 'react';

import Flex from './Flex';
import BackDrop from './BackDrop';
import { PositionsIndex } from '@src/styles';


type BackDropProps = {
  children?: JSX.Element | JSX.Element[];
  pt?: PositionsIndex;
};

const BackDropView = ({ children, pt = 3 }: BackDropProps) => {

  const handleBackDropPress = () => console.log('go back!');

  return (
    <React.Fragment>
      <BackDrop pressed={handleBackDropPress} />
      <Flex variant='backDropView' position={{ pt: pt }}>
        {children}
      </Flex>
    </React.Fragment >
  );
};

export default BackDropView;
