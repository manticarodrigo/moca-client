import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const InterestIcon = () => (
  <Svg width="24px" height="23px" viewBox="0 0 24 23">
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
        transform="translate(-309.000000, -764.000000)"
        strokeWidth={2}
      >
        <G id="icon-/-interest" transform="translate(310.000000, 765.000000)">
          <Path d="M0,11 L2,11" id="Path" stroke="#71CFEB" />
          <Path d="M3.222,3.222 L4.636,4.636" id="Path" stroke="#71CFEB" />
          <Path d="M11,0 L11,2" id="Path" stroke="#71CFEB" />
          <Path d="M18.778,3.222 L17.364,4.636" id="Path" stroke="#71CFEB" />
          <Path d="M22,11 L20,11" id="Path" stroke="#71CFEB" />
          <Path
            d="M17,11 C17,7.686 14.314,5 11,5 C7.686,5 5,7.686 5,11 C5,13.611 6.671,15.827 9,16.651 L9,21 L13,21 L13,16.651 C15.329,15.827 17,13.611 17,11 Z"
            id="Path"
            stroke="#BBE4F2"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default InterestIcon;
