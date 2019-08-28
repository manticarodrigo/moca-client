import React from 'react';

import Button from './Button';

type BackDropProps = {
  onPress: () => void;
};

const BackDrop = ({ onPress }: BackDropProps) => (
  <Button variant="backDrop" onPress={onPress} />
);

export default BackDrop;
