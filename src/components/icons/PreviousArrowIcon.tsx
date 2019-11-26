import React from 'react';
import Svg, { G, Rect, Polyline } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title, desc, filter */

const SvgComponent = () => (
  <Svg width="40px" height="40px" viewBox="0 0 40 40">
    <G id="Design" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="10.0---Schedule" transform="translate(-12.000000, -147.000000)">
        <G id="left-icon" transform="translate(16.000000, 147.000000)">
          <Rect
            id="Rectangle"
            fill="#FFFFFF"
            opacity={0.200000003}
            x={0}
            y={0}
            width={32}
            height={32}
            rx={16}
          />
          <G
            id="left-arrow"
            transform="translate(12.000000, 9.333333)"
            stroke="#57B0CC"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
          >
            <Polyline
              id="Path"
              points="6.6666665 0 0 6.6666665 6.6666665 13.333333"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
