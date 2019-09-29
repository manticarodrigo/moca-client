import React from 'react';
import Svg, { G, Path, Polyline, Rect } from 'react-native-svg';

const EmailIcon = () => (
  <Svg width="20px" height="17px" viewBox="0 0 20 17">
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
        transform="translate(-313.000000, -1048.000000)"
        stroke="#C5D2DC"
        strokeWidth={2}
      >
        <G id="email" transform="translate(314.000000, 1049.000000)">
          <G>
            <Polyline
              id="Path"
              points="14.7272727 3.33333333 9 9.16666667 3.27272727 3.33333333"
            />
            <Rect id="Rectangle" x={0} y={0} width={18} height={15} rx={2} />
            <Path d="M4.90909091,10 L3.27272727,11.6666667" id="Path" />
            <Path d="M13.0909091,10 L14.7272727,11.6666667" id="Path" />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default EmailIcon;
