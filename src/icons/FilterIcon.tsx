import React from 'react';
import Svg, { G, Rect, Path, Circle } from 'react-native-svg';

const FilterIcon = () => (
  <Svg width={56} height={56}>
    <G fill="none" fillRule="evenodd">
      <G fill="#57B0CC" transform="translate(4)">
        <Rect width={48} height={48} rx={8} />
      </G>
      <Rect width={24} height={24} rx={2} transform="translate(16 12)" />
      <G
        transform="translate(17 13)"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path d="M3 9V0M3 22v-3M11 1V0M11 22V11M19 9V0M19 22v-3" />
        <Circle cx={3} cy={16} r={3} />
        <Circle cx={11} cy={8} r={3} />
        <Circle cx={19} cy={16} r={3} />
      </G>
    </G>
  </Svg>
);

export default FilterIcon;
