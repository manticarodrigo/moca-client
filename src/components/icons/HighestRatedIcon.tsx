import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

import { Colors } from '@src/styles';

const HighestRatedIcon = ({ focused }) => (
  <Svg width="32px" height="32px" viewBox="0 0 32 32">
    <G
      id="Guide"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <G
        id="Assets"
        transform="translate(-324.000000, -1260.000000)"
        strokeWidth={2}
      >
        <G id="thumb-up" transform="translate(325.000000, 1261.000000)">
          <Rect
            id="Rectangle"
            stroke={focused ? Colors.white : '#BBE4F2'}
            x={0}
            y={14}
            width={6}
            height={16}
          />
          <Path
            d="M10,30 L23.8,30 C25.6744308,29.9996783 27.2972485,28.6977661 27.704,26.868 L29.926,16.868 C30.1895731,15.6823294 29.9001321,14.4411271 29.1392838,13.4943455 C28.3784355,12.5475639 27.2286113,11.9977788 26.014,12 L18,12 L18,4 C18,1.790861 16.209139,0 14,0 L10,12"
            id="Path"
            stroke={focused ? Colors.white : '#71CFEB'}
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default HighestRatedIcon;
