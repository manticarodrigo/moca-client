import React from 'react';

import Button from './Button';

type BackdropProps = {
  onPress: () => void;
};

const Backdrop = ({ onPress }: BackdropProps) => (
  <Button variant="backdrop" onPress={onPress} />
);

export default Backdrop;
