import React from 'react';
import Svg, { G, Rect, Path, Circle, Polyline } from 'react-native-svg';

type ClockIconProps = {
  white?: boolean;
}

const ClockIcon = ({ white }: ClockIconProps) => (
  <Svg width="18px" height="18px" viewBox="0 0 18 18">
    <G stroke="none" strokeWidth={2} fill="none" fillRule="evenodd">
      <G transform="translate(-1115.000000, -656.000000)">
        <G transform="translate(1112.000000, 653.000000)">
          <Rect x={0} y={0} width={24} height={24} rx={2} />
          <G
            transform="translate(4.000000, 4.000000)"
            stroke={white ? "#fff" : "#C5D2DC"}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M8,0 L8,2.90909091" />
            <Path d="M16,8 L13.0909091,8" />
            <Path d="M8,16 L8,13.0909091" />
            <Path d="M0,8 L2.90909091,8" />
            <Circle cx={8} cy={8} r={8} />
            <Polyline
              points="5.09090909 3.63636364 8 8 10.9090909 8"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default ClockIcon;
