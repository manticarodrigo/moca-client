import React from 'react';
import Svg, { G, Path, Polygon, Rect } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

const SvgComponent = () => (
  <Svg width="40px" height="49px" viewBox="0 0 40 49">
    <G
      id="Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <G id="checked-badge">
        <G id="Group-3">
          <Path
            d="M0,0 L40,0 L40,25 C40,29.418278 36.418278,33 32,33 L8,33 C3.581722,33 5.41083001e-16,29.418278 0,25 L0,0 L0,0 Z"
            id="Rectangle"
            fill="#71CFEB"
          />
          <Polygon
            id="Rectangle"
            fill="#71CFEB"
            points="0 8 40 8 40 49 20 40.374442 0 49"
          />
          <G
            id="icon-/-checked-white"
            transform="translate(10.000000, 10.000000)"
          >
            <G id="icon-/-arrow-right-light">
              <Rect id="Rectangle" x={0} y={0} width={20} height={20} rx={2} />
              <G id="c-check" fill="#FFFFFF" fillRule="nonzero">
                <Path
                  d="M10,0 C4.4771525,0 0,4.4771525 0,10 C0,15.5228475 4.4771525,20 10,20 C15.5228475,20 20,15.5228475 20,10 C19.9839811,4.48380139 15.5161986,0.0160189315 10,0 Z M8.33333333,14.5116667 L3.82166667,10 L5,8.82166667 L8.33333333,12.155 L15,5.48833333 L16.1783333,6.66666667 L8.33333333,14.5116667 Z"
                  id="Shape"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
