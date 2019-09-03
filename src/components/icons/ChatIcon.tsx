import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

import { Colors } from '@src/styles';

const ChatTabIcon = () => (
  <Svg width="100%" height="100%">
    <G fill="none" fillRule="evenodd">
      <G strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Path stroke={Colors.secondary} d="M21.8 5.7v11.7h-3.6V21l-5.4-3.6h-.9" />
        <Path stroke={Colors.secondaryLight} d="M18.2 3H2v10.8h3.6v4.5l6.3-4.5h6.3z" />
      </G>
    </G>
  </Svg>
);

export default ChatTabIcon;
