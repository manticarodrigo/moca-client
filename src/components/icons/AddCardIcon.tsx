import React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';

const AddCardIcon = () => (
  <Svg width="36px" height="36px" viewBox="0 0 36 36">
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
        transform="translate(-626.000000, -645.000000)"
        strokeWidth={3}
      >
        <G id="c-add" transform="translate(628.000000, 647.000000)">
          <Path d="M16,8.27586207 L16,23.7241379" id="Path" stroke="#57B0CC" />
          <Path d="M23.7241379,16 L8.27586207,16" id="Path" stroke="#57B0CC" />
          <Circle id="Oval" stroke="#71CFEB" cx={16} cy={16} r={16} />
        </G>
      </G>
    </G>
  </Svg>
);

export default AddCardIcon;
