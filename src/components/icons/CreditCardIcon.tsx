import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const CreditCardIcon = () => (
  <Svg width="20px" height="15px" viewBox="0 0 20 15">
    <G
      id="Guide"
      stroke="none"
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <G
        id="Assets"
        transform="translate(-1114.000000, -688.000000)"
        stroke="#C5D2DC"
      >
        <G id="credit-card" transform="translate(1114.000000, 688.000000)">
          <Path d="M4.375,10.625 L8.125,10.625" id="Path" />
          <Path d="M14.375,10.625 L15.625,10.625" id="Path" />
          <Path d="M19.375,5.625 L0.625,5.625" id="Path" />
          <Path
            d="M18.125,14.375 L1.875,14.375 C1.185,14.375 0.625,13.815 0.625,13.125 L0.625,1.875 C0.625,1.185 1.185,0.625 1.875,0.625 L18.125,0.625 C18.815,0.625 19.375,1.185 19.375,1.875 L19.375,13.125 C19.375,13.815 18.815,14.375 18.125,14.375 Z"
            id="Path"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default CreditCardIcon;
