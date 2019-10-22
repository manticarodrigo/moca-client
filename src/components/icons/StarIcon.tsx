import React from 'react';
import Svg, { G, Polygon, Polyline } from 'react-native-svg';

const SvgComponent = ({ clicked = false }) => (
  <Svg width="30px" height="28px" viewBox="0 0 30 28">
    <G
      id="Guide"
      stroke="none"
      strokeWidth={1}
      fill={clicked ? '#FFFFFF' : '#bbe4f2'}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <G
        id="Assets"
        transform="translate(-216.000000, -1386.000000)"
        stroke={clicked ? '#FFFFFF' : '#bbe4f2'}
      >
        <G id="rate-white" transform="translate(217.000000, 1387.000000)">
          <Polygon
            id="Path"
            points="14 0.32 18.12 8.66666667 27.3333333 10.0053333 20.6666667 16.504 22.24 25.68 14 21.3493333 5.76 25.68 7.33333333 16.504 0.666666667 10.0053333 9.88 8.66666667"
          />
          <Polyline
            id="Path"
            points="14 0.32 18.12 8.66666667 27.3333333 10.0053333 20.6666667 16.504 22.24 25.68 14 21.3493333"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
