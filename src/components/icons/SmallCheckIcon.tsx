import React from 'react';
import Svg, { G, Polygon } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

const SvgComponent = () => (
  <Svg width="10px" height="8px" viewBox="0 0 10 8">
    <G id="Design" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G
        id="2.0---Search-sorted"
        transform="translate(-95.000000, -244.000000)"
        fill="#BBE4F2"
        fillRule="nonzero"
      >
        <G id="Group-10" transform="translate(95.000000, 224.000000)">
          <Polygon
            id="Path-Copy-4"
            points="10 21.6470588 8.40909091 20 3.86363636 24.7058824 1.59090909 22.3529412 0 24 3.86363636 28"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
