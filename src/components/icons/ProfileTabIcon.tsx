import React from 'react';
import Svg, { G, Circle, Rect, Path } from 'react-native-svg';

const SvgComponent = ({ focused }) => (
  <Svg width={24} height={24}>
    <G transform="translate(-12 -12)" fill="none" fillRule="evenodd">
      <Circle cx={24} cy={24} r={24} />
      <G transform="translate(12 12)">
        <Rect width={24} height={24} rx={2} />
        <G
          transform="translate(1 1)"
          stroke="#C5D2DC"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        >
          <Path d="M18 19.486v-.745a3 3 0 00-1.512-2.605l-3.219-1.842m-4.542-.002l-3.215 1.844A3 3 0 004 18.741v.745" />
          <Path d="M11 15a4 4 0 01-4-4V9a4 4 0 018 0v2a4 4 0 01-4 4z" />
          <Circle cx={11} cy={11} r={11} />
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
