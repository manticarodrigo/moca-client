import React from 'react';
import Svg, { G, Rect, Polygon, Polyline } from 'react-native-svg';

import { Colors } from '@src/styles';

const MostReviewedIcon = ({ focused }) => (
  <Svg width="30px" height="28px" viewBox="0 0 30 28">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-215.000000, -1263.000000)">
        <G id="rate-icon-/-rate" transform="translate(214.000000, 1261.000000)">
          <G id="icon-/-rate">
            <Rect id="Rectangle" x={0} y={0} width={32} height={32} rx={8} />
            <G
              id="star"
              transform="translate(2.666667, 2.666667)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <Polygon
                id="Path"
                stroke={focused ? Colors.white : '#BBE4F2'}
                points="13.3333333 0.653333346 17.4533333 9.00000021 26.6666667 10.3386669 20 16.8373337 21.5733333 26.013334 13.3333333 21.6826672 5.09333333 26.013334 6.66666667 16.8373337 0 10.3386669 9.21333333 9.00000021"
              />
              <Polyline
                id="Path"
                stroke={focused ? Colors.white : '#71CFEB'}
                points="13.3333333 0.653333346 17.4533333 9.00000021 26.6666667 10.3386669 20 16.8373337 21.5733333 26.013334 13.3333333 21.6826672"
              />
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default MostReviewedIcon;
