import React from 'react';
import Svg, { G, Rect, Path } from 'react-native-svg';

const FacebookIcon = () => (
  <Svg width="22px" height="22px" viewBox="0 0 22 22">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-26.000000, -840.000000)">
        <G id="icon-/-instagram-2" transform="translate(25.000000, 839.000000)">
          <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={8} />
          <Rect
            id="Camera-Frame"
            stroke="#BBE4F2"
            strokeWidth={2}
            x={2}
            y={2}
            width={20}
            height={20}
            rx={5.87096774}
          />
          <G
            id="logo-fb-simple"
            transform="translate(8.000000, 6.000000)"
            fill="#71CFEB"
            fillRule="nonzero"
          >
            <Path
              d="M2.2671975,12 L2.25,6.75 L0,6.75 L0,4.5 L2.25,4.5 L2.25,3 C2.25,0.9756 3.5036325,0 5.309535,0 C6.1745775,0 6.918045,0.0644025 7.134705,0.0931875 L7.134705,2.2088025 L5.88222,2.2093725 C4.9000725,2.2093725 4.7099025,2.676075 4.7099025,3.36093 L4.7099025,4.5 L7.5,4.5 L6.75,6.75 L4.709895,6.75 L4.709895,12 L2.2671975,12 Z"
              id="Path"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default FacebookIcon;
