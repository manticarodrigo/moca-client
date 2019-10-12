import React from 'react';
import Svg, { G, Rect, Path } from 'react-native-svg';

const TermsAndConditionsIcon = () => (
  <Svg width="20px" height="23px" viewBox="0 0 20 23">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-205.000000, -767.000000)">
        <G
          id="icon-/-terms-conditions"
          transform="translate(203.000000, 766.000000)"
        >
          <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={8} />
          <G
            id="privacy"
            transform="translate(3.000000, 2.000000)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <Rect
              id="Rectangle"
              stroke="#71CFEB"
              x={5}
              y={10}
              width={8}
              height={5}
            />
            <Path
              d="M7,10 L7,7 C7.0032948,5.89679813 7.89679813,5.0032948 9,5 L9,5 C10.1032019,5.0032948 10.9967052,5.89679813 11,7 L11,10"
              id="Path"
              stroke="#71CFEB"
            />
            <Path
              d="M18,12 C18,16.9705627 13.9705627,21 9,21 C4.0294373,21 0,16.9705627 0,12 L0,2 L9,0 L18,2 L18,12 Z"
              id="Path"
              stroke="#BBE4F2"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default TermsAndConditionsIcon;
