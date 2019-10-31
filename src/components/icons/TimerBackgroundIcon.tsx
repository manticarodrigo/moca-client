import React from 'react';
import Svg, { G, Path, Circle, Polyline } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width="258px" height="157px" viewBox="0 0 258 157">
    <G
      id="Design"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
      opacity={0.03}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <G
        id="7.1---[PT]---Dashboards---Current-App---Start"
        transform="translate(-59.000000, -313.000000)"
        stroke="#000000"
        strokeWidth={6}
      >
        <G id="Group-3" transform="translate(0.000000, 199.000000)">
          <G id="timer" transform="translate(0.000000, 113.000000)">
            <G id="time-clock" transform="translate(0.000000, 1.000000)">
              <G transform="translate(62.000000, -50.000000)">
                <Path d="M252,126 L206.181818,126" id="Path" />
                <Path d="M126,252 L126,206.181818" id="Path" />
                <Path d="M0,126 L45.8181818,126" id="Path" />
                <Circle id="Oval" cx={126} cy={126} r={126} />
                <Polyline
                  id="Path"
                  points="80.1818182 57.2727273 126 126 171.818182 126"
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
