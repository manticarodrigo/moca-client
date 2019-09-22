import React from 'react';
import Svg, { G, Path, Circle, Rect } from 'react-native-svg';

const MasterCardIcon = () => (
  <Svg width="40px" height="30px" viewBox="0 0 40 30">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G
        id="Assets"
        transform="translate(-267.000000, -1554.000000)"
        fillRule="nonzero"
      >
        <G
          id="icon-/-bank-/-mastercard"
          transform="translate(263.000000, 1545.000000)"
        >
          <G id="icon-/-mastercard">
            <G id="mastercard" transform="translate(4.000000, 9.000000)">
              <Rect
                id="Rectangle"
                fill="#243747"
                x={0}
                y={0}
                width={40}
                height={29.5652174}
                rx={4}
              />
              <Circle
                id="Oval"
                fill="#E61C24"
                cx={15.6521739}
                cy={14.7826087}
                r={6.95652174}
              />
              <Circle
                id="Oval"
                fill="#F99F1B"
                cx={24.2904348}
                cy={14.7826087}
                r={6.95652174}
              />
              <Path
                d="M19.9713043,9.33565217 L19.9713043,9.33565217 C18.3055512,10.652518 17.3339328,12.6591989 17.3339328,14.7826087 C17.3339328,16.9060185 18.3055512,18.9126994 19.9713043,20.2295652 L19.9713043,20.2295652 C21.6370575,18.9126994 22.6086759,16.9060185 22.6086759,14.7826087 C22.6086759,12.6591989 21.6370575,10.652518 19.9713043,9.33565217 L19.9713043,9.33565217 Z"
                id="Path"
                fill="#F26622"
              />
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default MasterCardIcon;
