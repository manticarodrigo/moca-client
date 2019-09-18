import React from 'react';
import Svg, { G, Rect } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width="30px" height="30px" viewBox="0 0 30 30">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G
        id="Assets"
        transform="translate(-576.000000, -1143.000000)"
        stroke="#C5D2DC"
        strokeWidth={2}
      >
        <Rect id="tick-empty" x={577} y={1144} width={28} height={28} rx={8} />
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
