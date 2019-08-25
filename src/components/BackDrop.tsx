import React from 'react';

import Button from './Button';

type BackDropProps = {
  pressed: () => void;
};

const BackDrop = ({ pressed }: BackDropProps) => (
  <Button onPress={pressed} height="100%" bg="rgba(0,0,0,0.8)" />
);

export default BackDrop;
