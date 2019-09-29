import React from 'react';
import Svg, { G, Path, Polyline } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

const SvgComponent = () => (
  <Svg width="35px" height="35px" viewBox="0 0 24 24">
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
        transform="translate(-119.000000, -527.000000)"
        stroke="#FFFFFF"
        strokeWidth={2}
      >
        <G id="bin-1" transform="translate(120.000000, 528.000000)">
          <Path
            d="M19,8 L19,20 C19,21.1045695 18.1045695,22 17,22 L5,22 C3.8954305,22 3,21.1045695 3,20 L3,8"
            id="Path"
          />
          <Path d="M0,4 L22,4" id="Path" />
          <Path d="M11,11 L11,17" id="Path" />
          <Path d="M7,11 L7,17" id="Path" />
          <Path d="M15,11 L15,17" id="Path" />
          <Polyline id="Path" points="7 4 7 0 15 0 15 4" />
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
