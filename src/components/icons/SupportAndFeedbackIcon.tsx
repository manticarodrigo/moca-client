import React from 'react';
import Svg, { G, Rect, Path, Polyline, Circle } from 'react-native-svg';

const SupportAndFeedbackIcon = () => (
  <Svg width="24px" height="24px" viewBox="0 0 24 24">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-168.000000, -845.000000)">
        <G
          id="icon-/-support-feedback"
          transform="translate(168.000000, 845.000000)"
        >
          <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={8} />
          <G
            id="lifering"
            transform="translate(1.000000, 1.000000)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <Path
              d="M1.2,9 C1.995,5.082 5.082,1.995 9,1.2"
              id="Path"
              stroke="#BBE4F2"
            />
            <Path
              d="M9,20.8 C5.082,20.005 1.996,16.918 1.2,13"
              id="Path"
              stroke="#BBE4F2"
            />
            <Path
              d="M20.8,13 C20.005,16.918 16.918,20.004 13,20.8"
              id="Path"
              stroke="#BBE4F2"
            />
            <Path
              d="M13,1.2 C16.918,1.995 20.004,5.082 20.8,9"
              id="Path"
              stroke="#BBE4F2"
            />
            <Polyline
              id="Path"
              stroke="#71CFEB"
              points="9 6.416 9 0 13 0 13 6.416"
            />
            <Polyline
              id="Path"
              stroke="#71CFEB"
              points="15.584 9 22 9 22 13 15.584 13"
            />
            <Polyline
              id="Path"
              stroke="#71CFEB"
              points="13 15.584 13 22 9 22 9 15.584"
            />
            <Polyline
              id="Path"
              stroke="#71CFEB"
              points="6.416 13 0 13 0 9 6.416 9"
            />
            <Circle id="Oval" stroke="#71CFEB" cx={11} cy={11} r={5} />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SupportAndFeedbackIcon;
