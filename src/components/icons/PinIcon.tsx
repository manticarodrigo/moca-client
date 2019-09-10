import React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';

import { Colors } from '@src/styles';

const PinIcon = ({ size = 1 }) => (
  <Svg width={24 * size} height={30 * size} viewBox="0 0 24 30">
    <G
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <G strokeWidth={2 / size} transform="translate(1, 1)">
        <Path
          stroke={Colors.secondaryLight}
          d="M21.3333333,10.6666667 C21.3333333,17.2 10.6666667,28 10.6666667,28 C10.6666667,28 0,17.2 0,10.6666667 C0,3.86666667 5.46666667,0 10.6666667,0 C15.8666667,0 21.3333333,3.86666667 21.3333333,10.6666667 Z"
        />
        <Circle stroke={Colors.secondary} cx={10.6666667} cy={10.6666667} r={4} />
      </G>
    </G>
  </Svg>
);

export default PinIcon;
