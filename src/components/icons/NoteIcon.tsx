import React from 'react';
import Svg, { G, Rect, Path } from 'react-native-svg';

const NoteIcon = () => (
  <Svg width="28px" height="32px" viewBox="0 0 28 32">
    <G
      id="Guide"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <G
        id="Assets"
        transform="translate(-287.000000, -838.000000)"
        stroke="#BBE4F2"
        strokeWidth={2}
      >
        <G id="single-content-03" transform="translate(288.000000, 839.000000)">
          <Rect id="Rectangle" x={0} y={0} width={26} height={30} rx={3} />
          <Path d="M6,6 L20,6" id="Path" />
          <Path d="M6,12 L20,12" id="Path" />
          <Path d="M6,18 L20,18" id="Path" />
          <Path d="M6,24 L12,24" id="Path" />
        </G>
      </G>
    </G>
  </Svg>
);

export default NoteIcon;
