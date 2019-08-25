import React from 'react';
import SlideUp from '@src/components/SlideUp';
import { Text } from 'react-native';

const SlideUpExample = () => {
  return (
    <SlideUp top="30%">
      <Text> slide up component </Text>
    </SlideUp>
  );
};

export default SlideUpExample;
