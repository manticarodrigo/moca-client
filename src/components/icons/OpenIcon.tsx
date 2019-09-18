import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width="46px" height="12px" viewBox="0 0 46 12">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G
        id="Assets"
        transform="translate(-605.000000, -959.000000)"
        fill="#BBE4F2"
      >
        <G
          id="sheet-indicator-/-open"
          transform="translate(604.000000, 957.000000)"
        >
          <Path
            d="M3.90308392,5.61160616 L24.8022339,4.53518894 C26.054328,4.47069944 27.1216299,5.43344321 27.1861194,6.68553734 C27.1904061,6.76876582 27.1901065,6.85216721 27.1852218,6.93536273 C27.1006485,8.37581217 25.9460993,9.52209445 24.5050793,9.59631463 L3.6059294,10.6727319 C2.35383527,10.7372214 1.28653336,9.77447758 1.22204386,8.52238345 C1.21775715,8.43915497 1.21805682,8.35575358 1.22294148,8.27255806 C1.30751478,6.83210863 2.46206394,5.68582634 3.90308392,5.61160616 Z"
            id="Rectangle"
            transform="translate(14.204082, 7.603960) rotate(20.000000) translate(-14.204082, -7.603960) "
          />
          <Path
            d="M23.1977661,4.53518894 L44.0969161,5.61160616 C45.5379361,5.68582634 46.6924852,6.83210863 46.7770585,8.27255806 C46.8505438,9.52415644 45.8954944,10.598349 44.643896,10.6718342 C44.5607005,10.6767189 44.4772991,10.6770186 44.3940706,10.6727319 L23.4949207,9.59631463 C22.0539007,9.52209445 20.8993515,8.37581217 20.8147782,6.93536273 C20.741293,5.68376435 21.6963424,4.60957181 22.9479407,4.53608656 C23.0311363,4.53120189 23.1145377,4.53090223 23.1977661,4.53518894 Z"
            id="Rectangle-Copy"
            transform="translate(33.795918, 7.603960) rotate(-20.000000) translate(-33.795918, -7.603960) "
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
