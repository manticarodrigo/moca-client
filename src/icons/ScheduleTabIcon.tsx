import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

const white = '#fff';
const washedBlue = '#c5d2dc';
const lightBlue = '#bbe4f2';
const darkBlue = '#57b0cc';

const ScheduleTabIcon = ({ focused }) => (
  <Svg width={48} height={48}>
    <G fill="none" fillRule="evenodd">
      <Circle fill={focused ? darkBlue : 'none'} cx={24} cy={24} r={24} />
      <G
        transform="translate(13 13)"
        stroke={focused ? null : washedBlue}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path stroke={focused ? lightBlue : null} d="M16 15v2h2" />
        <Circle stroke={focused ? lightBlue : null} cx={16} cy={17} r={5} />
        <Path stroke={focused ? white : null} d="M8 21H0V3h22v7M6 0v3M16 0v3M0 7h22" />
      </G>
    </G>
  </Svg>
);

export default ScheduleTabIcon;
