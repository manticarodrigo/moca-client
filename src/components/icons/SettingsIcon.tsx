import React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';

const white = '#fff';
const lightBlue = '#85d4ed';
const lighterBlue = '#bae4f0';
const washedBlue = '#abd9e2';
const darkBlue = '#58b1cb';

const SettingsIcon = ({ width = 76.7, height = 83 }) => (
  <Svg viewBox="0 0 76.7 83" width={width} height={height}>
    <G>
      <Path
        fill={lightBlue}
        d="M2.4,14.1H74.3c3.2,0,3.2-5,0-5H2.4c-3.2,0-3.2,5,0,5Z"
      />
      <Circle fill={white} cx={59.5} cy={10.8} r={8.3} />
      <Path
        fill={darkBlue}
        d="M70.3,10.8c0-.3-.1-.5-.1-.8a10.8,10.8,0,0,0-21.5.8A10.8,10.8,0,0,0,59,21.5c6,.3,10.5-4.3,11.2-10C70.2,11.3,70.3,11.1,70.3,10.8Zm-16.6,0c0-7.5,11.2-7.4,11.6,0S53.7,18.3,53.7,10.8Z"
      />
      <Path
        fill={lightBlue}
        d="M2.4,75.6H74.3c3.2,0,3.2-5,0-5H2.4c-3.2,0-3.2,5,0,5Z"
      />
      <Circle fill={white} cx={59.5} cy={72.3} r={8.3} />
      <Path
        fill={darkBlue}
        d="M70.3,72.3c0-.3-.1-.6-.1-.8A10.8,10.8,0,1,0,59,83c6,.3,10.5-4.3,11.2-10C70.2,72.8,70.3,72.5,70.3,72.3Zm-16.6,0c0-7.5,11.2-7.5,11.6,0S53.7,79.7,53.7,72.3Z"
      />
      <Path
        fill={lightBlue}
        d="M74.3,39H2.4c-3.2,0-3.2,5,0,5H74.3c3.2,0,3.2-5,0-5Z"
      />
      <Circle fill={white} cx={17.3} cy={42.3} r={8.3} />
      <Path
        fill={darkBlue}
        d="M17.7,31.6c-6-.3-10.5,4.3-11.2,10v1.5c.7,5.5,4.9,10,10.8,10a10.8,10.8,0,0,0,.4-21.5ZM11.5,42.3c.4-7.4,11.5-7.5,11.5,0S11.9,49.7,11.5,42.3Z"
      />
      <Path
        fill={lighterBlue}
        d="M36.3,41.5A2.5,2.5,0,0,0,33.8,39H2.4c-3.2,0-3.2,5,0,5H33.8a2.5,2.5,0,0,0,2.5-2.5Z"
      />
      <Circle fill={white} cx={17.3} cy={42.3} r={8.3} />
      <Path
        fill={lighterBlue}
        d="M17.6,31.6c-6-.2-10.4,4.3-11.1,10v1.5c.7,5.5,4.9,10,10.8,10A10.8,10.8,0,0,0,27.6,39.4,10.7,10.7,0,0,0,17.6,31.6ZM11.5,42.3c.4-7.4,11.5-7.5,11.5,0S11.9,49.7,11.5,42.3Z"
      />
      <Path
        fill={washedBlue}
        d="M40.4,11.6a2.5,2.5,0,0,0,2.5,2.5H74.3c3.2,0,3.2-5,0-5H42.9a2.5,2.5,0,0,0-2.5,2.5Z"
      />
      <Circle fill={white} cx={59.5} cy={10.8} r={8.3} />
      <Path
        fill={lighterBlue}
        d="M59.1,21.6c6,.1,10.4-4.4,11.1-10.1,0-.2.1-.4.1-.7s-.1-.5-.1-.7C69.6,4.5,65.3,0,59.5,0A10.9,10.9,0,0,0,49.1,13.7,11,11,0,0,0,59.1,21.6Zm6.2-10.8c-.4,7.4-11.6,7.5-11.6,0S64.9,3.4,65.3,10.8Z"
      />
      <Path
        fill={lighterBlue}
        d="M40.4,73.1a2.6,2.6,0,0,0,2.5,2.5H74.3c3.2,0,3.2-5,0-5H42.9a2.5,2.5,0,0,0-2.5,2.5Z"
      />
      <Circle fill={white} cx={59.5} cy={72.3} r={8.3} />
      <Path
        fill={lighterBlue}
        d="M59.1,83c6,.2,10.4-4.3,11.1-10,0-.2.1-.5.1-.7s-.1-.6-.1-.8A10.8,10.8,0,1,0,59.1,83Zm6.2-10.7c-.4,7.4-11.6,7.4-11.6,0S64.9,64.8,65.3,72.3Z"
      />
    </G>
  </Svg>
);

export default SettingsIcon;
