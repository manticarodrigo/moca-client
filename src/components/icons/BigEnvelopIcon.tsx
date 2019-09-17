import React from 'react';
import Svg, { G, Circle, Path, Rect } from 'react-native-svg';

const BigEnvelopIcon = () => (
  <Svg width={114} height={114}>
    <G
      transform="translate(1 1)"
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
    >
      <Circle stroke="#BBE4F2" opacity={0.3} cx={56} cy={56} r={56} />
      <G
        transform="translate(28 33)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path stroke="#57B0CC" d="M47.278 8.944L28.11 28.111 8.944 8.944" />
        <Rect stroke="#71CFEB" width={56.222} height={46} rx={4} />
        <Path
          d="M17.889 28.111l-8.945 8.945M38.333 28.111l8.945 8.945"
          stroke="#57B0CC"
        />
      </G>
    </G>
  </Svg>
);

export default BigEnvelopIcon;
