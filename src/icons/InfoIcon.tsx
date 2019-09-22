import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

const InfoIcon = () => (
  <Svg width="24px" height="24px" viewBox="0 0 24 24">
    <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G transform="translate(-697.000000, -651.000000)">
        <G id="c-info" transform="translate(698.000000, 652.000000)">
          <Circle
            stroke="#71CFEB"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            cx={11}
            cy={11}
            r={11}
          />
          <Path
            d="M11,10 L11,16"
            stroke="#71CFEB"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle
            fill="#71CFEB"
            fillRule="nonzero"
            cx={11}
            cy={6}
            r={1}
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default InfoIcon;
