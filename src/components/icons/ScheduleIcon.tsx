import React from 'react';
import Svg, { G, Rect, Polyline, Circle, Path } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width={32} height={32} viewBox="0 0 28 28">
    <G id="Design" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G
        id="[PT]-Messages-12-Copy"
        transform="translate(-23.000000, -612.000000)"
      >
        <G id="Group-4" transform="translate(16.000000, 607.000000)">
          <G
            id="icon-/-schedule-white"
            transform="translate(13.000000, 11.000000)"
          >
            <G id="icon-/-status">
              <G id="icon-/-rate">
                <Rect
                  id="Rectangle"
                  x={0}
                  y={0}
                  width={16}
                  height={16}
                  rx={8}
                />
                <G
                  id="opening-times"
                  transform="translate(1.333333, 1.333333)"
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.2}
                >
                  <Polyline
                    id="Path"
                    points="9.57575758 9.09090909 9.57575758 10.4242424 10.9090909 10.4242424"
                  />
                  <Circle
                    id="Oval"
                    cx={9.6969697}
                    cy={10.3030303}
                    r={3.03030303}
                  />
                  <Polyline
                    id="Path"
                    points="4.84848485 12.7272727 0 12.7272727 0 1.81818182 13.3333333 1.81818182 13.3333333 6.06060606"
                  />
                  <Path d="M3.63636364,0 L3.63636364,1.81818182" id="Path" />
                  <Path d="M9.6969697,0 L9.6969697,1.81818182" id="Path" />
                  <Path d="M0,4.24242424 L13.3333333,4.24242424" id="Path" />
                </G>
              </G>
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
