import React from 'react';
import Svg, { G, Rect, Polyline, Polygon } from 'react-native-svg';

import { Colors } from '@src/styles';

const MessagesIcon = ({ size = 1 }) => (
  <Svg width={41 * size} height={38 * size} viewBox="0 0 41 38">
    <G fill="none" fillRule="evenodd">
      <G transform="translate(-2, -4)">
        <G>
          <Rect x={0} y={0} width={46} height={46} rx={2} />
          <G
            transform="translate(3.833333, 5.750000)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2 / size}
          >
            <Polyline
              stroke={Colors.secondaryLight}
              points="37.95 5.175 37.95 27.6 31.05 27.6 31.05 34.5 20.7 27.6 18.975 27.6"
            />
            <Polygon
              stroke={Colors.secondary}
              points="31.05 0 0 0 0 20.7 6.9 20.7 6.9 29.325 18.975 20.7 31.05 20.7"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default MessagesIcon;
