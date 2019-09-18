import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

const RightIcon = () => (
  <Svg width={32} height={32}>
    <G
      transform="translate(1 1)"
      stroke="#C5D2DC"
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Circle cx={15} cy={15} r={4.091} />
      <Path d="M25.91 15a10.976 10.976 0 00-.257-2.336l3.7-2.802-2.727-4.724-4.286 1.808a10.891 10.891 0 00-4.037-2.344L17.727 0h-5.454l-.576 4.602c-1.5.48-2.877 1.28-4.037 2.344L3.374 5.138.646 9.862l3.701 2.802a10.773 10.773 0 000 4.672l-3.7 2.802 2.727 4.724 4.286-1.808a10.891 10.891 0 004.037 2.344L12.273 30h5.454l.576-4.602c1.5-.48 2.877-1.28 4.037-2.344l4.286 1.808 2.728-4.724-3.701-2.802c.169-.767.254-1.55.256-2.336z" />
    </G>
  </Svg>
);

export default RightIcon;
