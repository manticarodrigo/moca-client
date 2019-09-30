import React from 'react';
import Svg, { G, Rect, Path, Circle } from 'react-native-svg';

const StatusIcon = () => (
  <Svg width={22} height={22}>
    <G transform="translate(-1 -1)" fill="none" fillRule="evenodd">
      <Rect width={24} height={24} rx={8} />
      <G
        transform="translate(2 2)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path stroke="#BBE4F2" strokeWidth={1.5} d="M14.364 13.636v2h2" />
        <Circle
          stroke="#BBE4F2"
          strokeWidth={2}
          cx={14.545}
          cy={15.455}
          r={4.545}
        />
        <Path
          stroke="#71CFEB"
          strokeWidth={2}
          d="M7.273 19.09H0V2.728h20v6.364M5.455 0v2.727M14.545 0v2.727M0 6.364h20"
        />
      </G>
    </G>
  </Svg>
);

export default StatusIcon;
