import React from 'react';
import Svg, { G, Circle, Rect, Line } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */


const white = '#fff';
const washedBlue = '#c5d2dc';
const lightBlue = '#bbe4f2';
const darkBlue = '#57b0cc';

const SvgComponent = ({ focused }) => (
  <Svg width="48px" height="48px" viewBox="0 0 48 48">
    <G
      id="Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <G id="Guide-Copy" transform="translate(-1127.000000, -95.000000)">
        <G
          id="navbar-/-icon-/-search-selected"
          transform="translate(1127.000000, 95.000000)"
        >
          <Circle id="Oval-Copy-2" fill={focused ? darkBlue : null} cx={24} cy={24} r={24} />
          <G
            id="icon-/-search-selected"
            transform="translate(12.000000, 12.000000)"
          >
            <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={2} />
            <G
              id="seacrh"
              transform="translate(2.000000, 2.000000)"
              stroke={!focused ? washedBlue : null}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <Line
                x1={20}
                y1={20}
                x2={13.656}
                y2={13.656}
                id="Path"
                stroke={focused ? lightBlue : null}
              />
              <Circle id="Oval" stroke={focused ? white : null} cx={8} cy={8} r={8} />
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
