import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

import { Colors } from '@src/styles';

const ContactIcon = ({ tint = Colors.success }) => (
  <Svg width="42px" height="42px" viewBox="0 0 42 42">
    <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <G transform="translate(-619.000000, -765.000000)" stroke={tint} strokeWidth="2">
        <G transform="translate(620.000000, 766.000000)">
          <Path d="M14.5454545,18.1818182 L14.5454545,18.1818182 C10.5290909,18.1818182 7.27272727,14.9254545 7.27272727,10.9090909 L7.27272727,7.27272727 C7.27272727,3.25636364 10.5290909,0 14.5454545,0 L14.5454545,0 C18.5618182,0 21.8181818,3.25636364 21.8181818,7.27272727 L21.8181818,10.9090909 C21.8181818,14.9254545 18.5618182,18.1818182 14.5454545,18.1818182 Z" />
          <Path d="M29.0909091,40 L0,40 L0,32.52 C0,30.2527273 1.39090909,28.2236364 3.51090909,27.42 C6.03272727,26.4636364 9.81636364,25.4545455 14.5454545,25.4545455 C19.2745455,25.4545455 23.0581818,26.4636364 25.58,27.42 C27.7,28.2218182 29.0909091,30.2527273 29.0909091,32.52 L29.0909091,40 Z" />
          <Path d="M29.0909091,5.45454545 L40,5.45454545" opacity="0.9" />
          <Path d="M29.0909091,14.5454545 L40,14.5454545" opacity="0.9" />
          <Path d="M34.5454545,23.6363636 L40,23.6363636" opacity="0.9" />
        </G>
      </G>
    </G>
  </Svg>
);

export default ContactIcon;
