import React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';

const QualificationIcon = () => (
  <Svg width={24} height={23}>
    <G
      transform="translate(1 1)"
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path stroke="#BBE4F2" d="M11 19H0V0h18v7" />
      <Path stroke="#71CFEB" d="M21 13.625V21l-3-1-3 1v-7.375" />
      <Circle stroke="#71CFEB" cx={18} cy={11} r={4} />
      <Path d="M4 5h9M4 9h6M4 13h6" stroke="#BBE4F2" />
    </G>
  </Svg>
);

export default QualificationIcon;
