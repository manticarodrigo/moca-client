import React from 'react';
import Svg, { Defs, G, Rect, Circle } from 'react-native-svg';

const SwitchIcon = ({ isOn = true }) => (
  <Svg width="56px" height="36px" viewBox="0 0 56 36">
    <Defs />
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform={isOn ? 'translate(-975.000000, -979.000000)' : 'translate(-975.000000, -1028.000000)'}>
        <G id="swtich-/-off-1" transform={isOn ? 'translate(975.000000, 979.000000)' : 'translate(975.000000, 1028.000000)'}>
          <Rect
            id="Rectangle"
            fill={isOn ? '#99B366' : '#F3F2F7'}
            x={0}
            y={0}
            width={56}
            height={32}
            rx={16}
          />
          <G
            id="Oval-2"
            transform={isOn ? 'translate(28.000000, 4.000000)' : 'translate(4.000000, 4.000000)'}
            fill="#FFFFFF"
          >
            <Circle id="Oval" cx={12} cy={12} r={12} />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SwitchIcon;
