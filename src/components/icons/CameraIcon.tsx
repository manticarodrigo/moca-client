import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

const CameraIcon = () => (
  <Svg width="28px" height="25px" viewBox="0 0 38 34">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-808.000000, -492.000000)">
        <G id="camera" transform="translate(809.000000, 493.000000)">
          <Circle
            id="Oval"
            stroke="#143D6C"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            cx={17.6}
            cy={17.6}
            r={8}
          />
          <Path
            d="M32,32 L3.2,32 C1.4326888,32 0,30.5673112 0,28.8 L0,8 C0,6.2326888 1.4326888,4.8 3.2,4.8 L9.6,4.8 L12.8,0 L22.4,0 L25.6,4.8 L32,4.8 C33.7673112,4.8 35.2,6.2326888 35.2,8 L35.2,28.8 C35.2,30.5673112 33.7673112,32 32,32 Z"
            id="Path"
            stroke="#143D6C"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle
            id="Oval"
            fill="#143D6C"
            fillRule="nonzero"
            cx={4.8}
            cy={9.6}
            r={1.6}
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default CameraIcon;
