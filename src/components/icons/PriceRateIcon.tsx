import React from 'react';
import Svg, { G, Path, Ellipse, Polyline } from 'react-native-svg';

const PriceRateIcon = () => (
  <Svg width="24px" height="24px" viewBox="0 0 24 24">
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
        transform="translate(-240.000000, -766.000000)"
        strokeWidth={2}
      >
        <G id="icon-/-price-rate" transform="translate(241.000000, 767.000000)">
          <G id="money-time">
            <Path
              d="M10,11 L10,15 C10,16.657 12.686,18 16,18 C19.314,18 22,16.657 22,15 L22,11"
              id="Path"
              stroke="#71CFEB"
            />
            <Path
              d="M10,15 L10,19 C10,20.657 12.686,22 16,22 C19.314,22 22,20.657 22,19 L22,15"
              id="Path"
              stroke="#71CFEB"
            />
            <Ellipse id="Oval" stroke="#71CFEB" cx={16} cy={11} rx={6} ry={3} />
            <Polyline id="Path" stroke="#BBE4F2" points="7 4 7 7 4 7" />
            <Path
              d="M7,14 C3.134,14 0,10.866 0,7 C0,3.134 3.134,0 7,0 C10.171,0 12.85,2.109 13.71,5.001"
              id="Path"
              stroke="#BBE4F2"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default PriceRateIcon;
