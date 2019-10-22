import React from 'react';
import Svg, { G, Rect, Path } from 'react-native-svg';

const BookmarkIcon = () => (
  <Svg width="20px" height="23px" viewBox="0 0 20 23">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-125.000000, -839.000000)">
        <G id="icon-/-bookmark" transform="translate(123.000000, 838.000000)">
          <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={8} />
          <G
            id="bookmarks"
            transform="translate(3.000000, 2.000000)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <Path
              d="M14,21 L7,16 L0,21 L0,6 C0,4.8954305 0.8954305,4 2,4 L12,4 C13.1045695,4 14,4.8954305 14,6 L14,21 Z"
              id="Path"
              stroke="#71CFEB"
            />
            <Path
              d="M5,0 L16,0 C17.1045695,0 18,0.8954305 18,2 L18,18"
              id="Path"
              stroke="#BBE4F2"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default BookmarkIcon;
