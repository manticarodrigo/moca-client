import React from 'react';
import Svg, { Path } from 'react-native-svg';

const lightNavy = '#143d6c';

const SendIcon = ({ active }) => (
  <Svg width={30} height={30} viewBox="0 0 24 24" fill={lightNavy} opacity={active ? 1 : 0.5}>
    <Path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </Svg>
);

export default SendIcon;
