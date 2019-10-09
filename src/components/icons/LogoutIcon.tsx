import React from 'react';
import Svg, { G, Rect, Path, Polyline } from 'react-native-svg';

const LogoutIcon = () => (
  <Svg width="17px" height="21px" viewBox="0 0 17 21">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-203.000000, -838.000000)">
        <G id="icon-/-logout" transform="translate(199.000000, 837.000000)">
          <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={8} />
          <G
            id="logout"
            transform="translate(5.000000, 2.000000)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <Path
              d="M3.7012987,9.5 L14.8051948,9.5"
              id="Path"
              stroke="#F53E3F"
            />
            <Polyline
              id="Path"
              stroke="#F53E3F"
              points="11.1038961 12.9545455 14.8051948 9.5 11.1038961 6.04545455"
            />
            <Polyline
              id="Path"
              stroke="#FA8182"
              points="12.9545455 2.59090909 12.9545455 0 0 0 0 19 12.9545455 19 12.9545455 16.4090909"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default LogoutIcon;
