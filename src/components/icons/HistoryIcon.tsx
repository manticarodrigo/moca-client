import React from 'react';
import Svg, { G, Polyline, Path, Polygon } from 'react-native-svg';

const HistoryIcon = () => (
  <Svg width="45px" height="45px" viewBox="0 0 45 45">
    <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G transform="translate(-621.000000, -550.000000)">
        <G transform="translate(622.000000, 551.000000)">
          <Polyline
            stroke="#71CFEB"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            points="18.75 10.25 18.75 24.25 32.75 24.25"
          />
          <Path
            d="M0.875,21.5 C0.875,11.716406 7.74874971,3.2790841 17.3303248,1.30117334 C26.9118999,-0.676737417 36.5646839,4.34906456 40.4389503,13.3328707 C44.3132167,22.3166768 41.3428053,32.7862317 33.3278285,38.396834 C25.3128516,44.0074363 14.4589521,43.2151032 7.34375,36.5"
            stroke="#57B0CC"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Polygon
            fill="#71CFEB"
            fillRule="nonzero"
            points="4.625 44 0.125 31.25 13.625 32"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default HistoryIcon;
