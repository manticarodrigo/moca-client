import React from 'react';
import Svg, { G, Circle, Rect, Path } from 'react-native-svg';

import { Colors } from '@src/styles';

const DashboardIcon = ({ focused }) => (
  <Svg width={48} height={48} viewBox="0 0 48 48">
    <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      {focused && <Circle fill="#57B0CC" cx={24} cy={24} r={24} />}
      <G transform="translate(11.000000, 11.000000)">
        <Rect x={0} y={0} width={26} height={26} rx={2} />
        <G
          transform="translate(4.000000, 3.000000)"
          fill={focused ? Colors.white : Colors.semiGreyAlt}
          fillRule="nonzero"
          stroke={focused ? Colors.white : Colors.semiGreyAlt}
          strokeWidth={0.8}
        >
          <G transform="translate(0.000000, 0.015359)">
            <Path d="M8.88678732,0.128398482 L0.256230368,6.60131619 C0.0969361783,6.72183976 -0.000830770853,6.92075468 5.31996606e-06,7.12048735 L5.31996606e-06,18.7717392 C5.31996606e-06,19.1105533 0.30848839,19.419031 0.64730248,19.419031 L6.47292842,19.419031 C6.81174251,19.419031 7.12022019,19.1105533 7.12022019,18.7717392 L7.12022019,12.0830576 L11.4354987,12.0830576 L11.4354987,18.7717392 C11.4354987,19.1105533 11.7439763,19.419031 12.0827904,19.419031 L17.9084164,19.419031 C18.2472305,19.419031 18.5557081,19.1105533 18.5557081,18.7717392 L18.5557081,7.12048735 C18.5557081,6.92073742 18.4587827,6.72182035 18.2994885,6.60131619 L9.66893154,0.128398482 C9.38658287,-0.0511235754 9.13964106,-0.0342680977 8.88678732,0.128398482 Z M9.27785943,1.45668435 L17.2611246,7.44413323 L17.2611246,18.1244475 L12.7300822,18.1244475 L12.7300822,11.4357658 C12.7300822,11.0969517 12.4216045,10.3569462 12.0827904,10.3569462 L6.47292842,10.3569462 C6.13411433,10.3569462 5.82563665,11.0969517 5.82563665,11.4357658 L5.82563665,18.1244475 L1.29459425,18.1244475 L1.29459425,7.44413323 L9.27785943,1.45668435 Z" />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default DashboardIcon;
