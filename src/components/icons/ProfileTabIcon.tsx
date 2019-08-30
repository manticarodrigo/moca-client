import React from 'react';
import Svg, { G, Circle, Rect, Path } from 'react-native-svg';

const white = '#fff';
const washedBlue = '#c5d2dc';
const lightBlue = '#bbe4f2';
const darkBlue = '#57b0cc';

const ProfileTabIcon = ({ focused }) => (
  <Svg width="48px" height="48px" viewBox="0 0 48 48">
    <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G transform="translate(-924.000000, -43.000000)">
        <G transform="translate(924.000000, 43.000000)">
          <Circle fill={focused ? darkBlue : null} cx={24} cy={24} r={24} />
          <G transform="translate(12.000000, 12.000000)">
            <Rect x={0} y={0} width={24} height={24} rx={2} />
            <G
              transform="translate(1.000000, 1.000000)"
              stroke={focused ? null : washedBlue}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <Path
                d="M18,19.486 L18,18.741 C18,17.664 17.423,16.67 16.488,16.136 L13.269,14.294"
                stroke={focused ? white : null}
              />
              <Path
                d="M8.727,14.292 L5.512,16.136 C4.577,16.67 4,17.664 4,18.741 L4,19.486"
                stroke={focused ? white : null}
              />
              <Path
                d="M11,15 L11,15 C8.791,15 7,13.209 7,11 L7,9 C7,6.791 8.791,5 11,5 L11,5 C13.209,5 15,6.791 15,9 L15,11 C15,13.209 13.209,15 11,15 Z"
                stroke={focused ? white : null}
              />
              <Circle stroke={focused ? lightBlue : null} cx={11} cy={11} r={11} />
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default ProfileTabIcon;
