import React from 'react';
import Svg, { G, Rect, Path, Circle } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width="74px" height="87px" viewBox="0 0 74 87">
    <G id="Design" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G
        id="3.1---[PT]-Zip-Code---Typed-Copy"
        transform="translate(-151.000000, -124.000000)"
      >
        <G id="Group-2" transform="translate(0.000000, 124.000000)">
          <G id="Group" transform="translate(24.000000, 0.000000)">
            <G
              id="icon-/-add-location-big"
              transform="translate(120.000000, 0.000000)"
            >
              <Rect id="Rectangle" x={0} y={0} width={88} height={88} rx={2} />
              <G
                id="pin-add-2"
                transform="translate(9.000000, 2.000000)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
              >
                <Path
                  d="M30.4333333,81.6166667 C30.4333333,81.6166667 0,51.1833333 0,30.5716667 C0,11.2229833 15.7271167,0 30.4333333,0 C45.13955,0 60.8666667,11.2229833 60.8666667,30.5716667 C60.7622097,34.3182736 59.9999194,38.017348 58.6146,41.5"
                  id="Path"
                  stroke="#71CFEB"
                />
                <Circle
                  id="Oval"
                  stroke="#71CFEB"
                  cx={30.4333333}
                  cy={30.4333333}
                  r={11.0666667}
                />
                <Path
                  d="M52.5666667,60.8666667 L52.5666667,71.9333333"
                  id="Path"
                  stroke="#57B0CC"
                />
                <Path
                  d="M47.0333333,66.4 L58.1,66.4"
                  id="Path"
                  stroke="#57B0CC"
                />
                <Circle
                  id="Oval"
                  stroke="#57B0CC"
                  cx={52.5666667}
                  cy={66.4}
                  r={16.6}
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
