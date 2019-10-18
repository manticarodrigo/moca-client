import React from 'react';
import Svg, { G, Rect, Path, Circle } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

const SvgComponent = () => (
  <Svg width="24px" height="18px" viewBox="0 0 24 18">
    <G
      id="Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <G id="Guide-Copy" transform="translate(-25.000000, -1054.000000)">
        <G
          id="icon-/-arrow-right-light"
          transform="translate(25.000000, 1051.000000)"
        >
          <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={2} />
          <G
            id="preview"
            transform="translate(1.000000, 4.000000)"
            stroke="#C5D2DC"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <Path
              d="M0,7.7 C0,7.7 4.4,0 11,0 C17.6,0 22,7.7 22,7.7 C22,7.7 17.6,15.4 11,15.4 C4.4,15.4 0,7.7 0,7.7 Z"
              id="Path"
            />
            <Circle id="Oval" cx={11} cy={7.7} r={3.3} />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
