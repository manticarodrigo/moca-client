import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';


const SearchIcon = ({ tint = '#57B0CC' }) => (
  <Svg width="22px" height="22px" viewBox="0 0 22 22">
    <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <G transform="translate(-1073.000000, -714.000000)" stroke={tint} strokeWidth="2">
        <G transform="translate(1074.000000, 715.000000)">
          <Path d="M20,20 L13.656,13.656" />
          <Circle cx="8" cy="8" r="8" />
        </G>
      </G>
    </G>
  </Svg>
);

export default SearchIcon;
