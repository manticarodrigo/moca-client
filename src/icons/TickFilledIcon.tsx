import React from 'react';
import Svg, { G, Rect, Polygon } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width="30px" height="30px" viewBox="0 0 30 30">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-540.000000, -1143.000000)">
        <G id="tick-filled" transform="translate(540.000000, 1143.000000)">
          <Rect
            id="Rectangle-Copy-3"
            stroke="#57B0CC"
            strokeWidth={2}
            x={1}
            y={1}
            width={28}
            height={28}
            rx={8}
          />
          <Rect
            id="Rectangle-Copy-3"
            fill="#57B0CC"
            x={3}
            y={3}
            width={24}
            height={24}
            rx={6}
          />
          <G
            id="d-check"
            transform="translate(8.000000, 10.000000)"
            fill="#FFFFFF"
            fillRule="nonzero"
          >
            <Polygon
              id="Path"
              points="13.8 2.19545455 11.6045455 0 5.33181818 6.27272727 2.19545455 3.13636364 0 5.33181818 5.33181818 10.6636364"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
