import React from 'react';
import Svg, { G, Circle, Polyline, Rect, Path } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width="114px" height="114px" viewBox="0 0 114 114">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G
        id="Assets"
        transform="translate(-884.000000, -1078.000000)"
        stroke="#F53E3F"
        strokeWidth={2}
      >
        <G id="big-envelope-red" transform="translate(885.000000, 1079.000000)">
          <Circle id="Mask" opacity={0.3} cx={56} cy={56} r={56} />
          <G
            id="email"
            transform="translate(28.000000, 33.000000)"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Polyline
              id="Path"
              points="47.2777778 8.94444444 28.1111111 28.1111111 8.94444444 8.94444444"
            />
            <Rect
              id="Rectangle"
              x={0}
              y={0}
              width={56.2222222}
              height={46}
              rx={4}
            />
            <Path d="M17.8888889,28.1111111 L8.94444444,37.0555556" id="Path" />
            <Path d="M38.3333333,28.1111111 L47.2777778,37.0555556" id="Path" />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
