import React from 'react';
import Svg, { G, Path, Polyline } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

const SvgComponent = () => (
  <Svg width="20px" height="20px" viewBox="0 0 20 20">
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
        transform="translate(-462.000000, -837.000000)"
        stroke="#F53E3F"
        strokeWidth={2}
      >
        <G id="bin-2" transform="translate(463.000000, 838.000000)">
          <Path
            d="M15.5454545,6.54545455 L15.5454545,16.3636364 C15.5454545,17.267375 14.8128296,18 13.9090909,18 L4.09090909,18 C3.18717041,18 2.45454545,17.267375 2.45454545,16.3636364 L2.45454545,6.54545455"
            id="Path"
          />
          <Path d="M0,3.27272727 L18,3.27272727" id="Path" />
          <Path d="M9,9 L9,13.9090909" id="Path" />
          <Path d="M5.72727273,9 L5.72727273,13.9090909" id="Path" />
          <Path d="M12.2727273,9 L12.2727273,13.9090909" id="Path" />
          <Polyline
            id="Path"
            points="5.72727273 3.27272727 5.72727273 0 12.2727273 0 12.2727273 3.27272727"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
