import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

const ErrorIcon = ({ tint = '#F53E3F' }) => (
  <Svg width="24px" height="24px" viewBox="0 0 24 24">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-1115.000000, -589.000000)">
        <G id="c-warning" transform="translate(1116.000000, 590.000000)">
          <Circle
            id="Oval"
            stroke={tint}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            cx={11}
            cy={11}
            r={11}
          />
          <Path
            d="M11,6 L11,12"
            id="Path"
            stroke={tint}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle
            id="Oval"
            fill={tint}
            fillRule="nonzero"
            cx={11}
            cy={16}
            r={1}
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default ErrorIcon;
