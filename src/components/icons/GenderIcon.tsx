import React from 'react';
import Svg, { G, Rect, Circle, Path } from 'react-native-svg';

const GenderIcon = () => (
  <Svg width={24} height={23}>
    <G transform="translate(0 -1)" fill="none" fillRule="evenodd">
      <Rect width={24} height={24} rx={8} />
      <G
        transform="translate(1 2)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Circle stroke="#71CFEB" cx={6} cy={9} r={6} />
        <Path d="M6 15v6M4 19h4" stroke="#71CFEB" />
        <Path d="M17.2 4.8L22 0" stroke="#BBE4F2" />
        <Circle stroke="#BBE4F2" cx={13} cy={9} r={6} />
        <Path stroke="#BBE4F2" d="M18 0h4v4" />
      </G>
    </G>
  </Svg>
);

export default GenderIcon;
