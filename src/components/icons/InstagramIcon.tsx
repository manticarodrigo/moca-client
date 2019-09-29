import React from 'react';
import Svg, { G, Rect, Ellipse } from 'react-native-svg';

const InstagramIcon = () => (
  <Svg width="22px" height="22px" viewBox="0 0 22 22">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-58.000000, -840.000000)">
        <G id="icon-/-instagram-1" transform="translate(57.000000, 839.000000)">
          <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={8} />
          <G id="Icon" transform="translate(2.000000, 2.000000)">
            <Rect
              id="Camera-Frame"
              stroke="#BBE4F2"
              strokeWidth={2}
              x={0}
              y={0}
              width={20}
              height={20}
              rx={5.87096774}
            />
            <Ellipse
              id="Oval-1"
              stroke="#71CFEB"
              strokeWidth={2}
              cx={10.0291545}
              cy={10.0879765}
              rx={4.78134111}
              ry={4.80938416}
            />
            <Ellipse
              id="Oval-2"
              fill="#71CFEB"
              cx={15.8892128}
              cy={4.10557185}
              rx={1.39941691}
              ry={1.40762463}
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default InstagramIcon;
