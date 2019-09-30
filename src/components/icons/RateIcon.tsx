import React from 'react';
import Svg, { G, Rect, Path } from 'react-native-svg';

const RateIcon = () => (
  <Svg width={22} height={22}>
    <G transform="translate(-1 -1)" fill="none" fillRule="evenodd">
      <Rect width={24} height={24} rx={8} />
      <G strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Path
          stroke="#BBE4F2"
          d="M12 2.49l3.09 6.26L22 9.754l-5 4.874 1.18 6.882L12 18.262 5.82 21.51 7 14.628 2 9.754 8.91 8.75z"
        />
        <Path
          stroke="#71CFEB"
          d="M12 2.49l3.09 6.26L22 9.754l-5 4.874 1.18 6.882L12 18.262"
        />
      </G>
    </G>
  </Svg>
);

export default RateIcon;
