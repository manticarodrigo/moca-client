import React from 'react';

import Button from './Button';

type BackDropProps = {
  pressed: () => void;
};

const BackDrop = ({ pressed }: BackDropProps) => (
  <Button variant='backDrop' onPress={pressed} />
);

export default BackDrop;
