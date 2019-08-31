import React from 'react';
import Svg, { G, Rect, Polyline } from 'react-native-svg';

const BackButtonIcon = () => (
  <Svg width="40px" height="40px" viewBox="0 0 40 40">
    <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-1049.000000, -360.000000)">
        <G transform="translate(1053.000000, 360.000000)">
          <G>
            <Rect
              fill="#57B0CC"
              x={0}
              y={0}
              width={32}
              height={32}
              rx={16}
            />
            <G
              transform="translate(12.000000, 9.333334)"
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
            >
              <Polyline
                points="6.66666641 0 0 6.66666641 6.66666641 13.3333328"
              />
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default BackButtonIcon;
