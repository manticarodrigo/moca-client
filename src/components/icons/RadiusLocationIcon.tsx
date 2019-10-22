import React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';

const SvgComponent = () => (
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
        transform="translate(-381.000000, -836.000000)"
        strokeWidth={2}
      >
        <G
          id="icon-/-radius-location"
          transform="translate(382.000000, 837.000000)"
        >
          <G id="position-pin">
            <Path
              d="M18,7 C18,11.32 11,18.375 11,18.375 C11,18.375 4,11.32 4,7 C4,2.57 7.617,0 11,0 C14.383,0 18,2.57 18,7 Z"
              id="Path"
              stroke="#71CFEB"
            />
            <Circle id="Oval" stroke="#71CFEB" cx={11} cy={7} r={2} />
            <Path
              d="M17,16.485 C20.01,17.02 22,17.947 22,19 C22,20.657 17.075,22 11,22 C4.925,22 0,20.657 0,19 C0,17.947 1.99,17.02 5,16.485"
              id="Path"
              stroke="#BBE4F2"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
