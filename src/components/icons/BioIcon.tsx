import React from 'react';
import Svg, { G, Rect, Circle, Path } from 'react-native-svg';

const BioIcon = () => (
  <Svg width="18px" height="21px" viewBox="0 0 18 21">
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
        transform="translate(-503.000000, -836.000000)"
        strokeWidth={1.7}
      >
        <G id="icon-/-bio" transform="translate(504.000000, 837.000000)">
          <G id="user">
            <Rect
              id="Rectangle"
              stroke="#BBE4F2"
              x={0}
              y={0}
              width={15.5454545}
              height={19}
              rx={4}
            />
            <Circle
              id="Oval"
              stroke="#71CFEB"
              cx={7.77272727}
              cy={5.61363636}
              r={2.15909091}
            />
            <Path
              d="M7.77272727,10.3636364 C5.38786131,10.3636364 3.45454545,12.2969522 3.45454545,14.6818182 L12.0909091,14.6818182 C12.0909091,12.2969522 10.1575932,10.3636364 7.77272727,10.3636364 L7.77272727,10.3636364 Z"
              id="Path"
              stroke="#71CFEB"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default BioIcon;
