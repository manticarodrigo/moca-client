import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

const ScheduleSectionIcon = () => (
  <Svg width="9px" height="53px" viewBox="0 0 9 53">
    <G
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <G
        transform="translate(-16.000000, -14.000000)"
        stroke="#C5D2DC"
      >
        <G>
          <Circle cx={20.5} cy={18.5} r={3.5} />
          <Circle cx={20.5} cy={62.5} r={3.5} />
          <Path
            d="M20.5,27.5 L20.5,54.5"
            strokeLinecap="square"
            strokeDasharray="2,3"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default ScheduleSectionIcon;
