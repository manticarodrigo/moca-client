import React from 'react';
import Svg, { G, Polyline, Path } from 'react-native-svg';

const LowestPriceIcon = () => (
  <Svg width="32px" height="30px" viewBox="0 0 32 30">
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
        transform="translate(-105.000000, -1262.000000)"
        strokeWidth={2}
      >
        <G id="lowest-price" transform="translate(106.000000, 1263.000000)">
          <G id="currency-dollar" stroke="#BBE4F2">
            <Path
              d="M13.74275,5.74 C10.77825,4.109 1.442,2.8945 1.442,8.50675 C1.442,15.22325 13.29825,12.85375 13.29825,18.781 C13.29825,24.70825 5.59825,24.26375 0.25725,22.337"
              id="Path"
            />
            <Path d="M7.875,0.875 L7.875,27.125" id="Path" />
          </G>
          <G
            id="alpha-order"
            transform="translate(17.000000, 1.000000)"
            stroke="#71CFEB"
          >
            <Polyline id="Path" points="0 19.5 6.5 26 13 19.5" />
            <Path d="M6.5,26 L6.5,0" id="Path" />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default LowestPriceIcon;
