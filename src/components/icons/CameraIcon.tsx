import React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';

const lightNavy = '#143d6c';

const CameraIcon = () => (
  <Svg width="28pt" height="25pt" viewBox="0 0 38 34">
    <Defs>
      <ClipPath id="clip1">
        <Path d="M 4 9 L 8 9 L 8 13 L 4 13 Z M 4 9 " />
      </ClipPath>
      <ClipPath id="clip2">
        <Path d="M 5.800781 12.199219 C 6.683594 12.199219 7.398438 11.484375 7.398438 10.601563 C 7.398438 9.714844 6.683594 9 5.800781 9 C 4.917969 9 4.199219 9.714844 4.199219 10.601563 C 4.199219 11.484375 4.917969 12.199219 5.800781 12.199219 Z M 5.800781 12.199219 " />
      </ClipPath>
    </Defs>
    <G id="surface1">
      <Path
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={lightNavy}
        strokeOpacity={1}
        strokeMiterlimit={10}
        d="M 8.001563 16.001562 C 12.419531 16.001562 16.001562 12.419531 16.001562 8.001562 C 16.001562 3.583594 12.419531 0.0015625 8.001563 0.0015625 C 3.583594 0.0015625 0.0015625 3.583594 0.0015625 8.001562 C 0.0015625 12.419531 3.583594 16.001562 8.001563 16.001562 Z M 8.001563 16.001562 "
        transform="matrix(1,0,0,1,10.6,10.6)"
      />
      <Path
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={lightNavy}
        strokeOpacity={1}
        strokeMiterlimit={10}
        d="M 32 32 L 3.199219 32 C 1.433594 32 0 30.566406 0 28.800781 L 0 8 C 0 6.234375 1.433594 4.800781 3.199219 4.800781 L 9.601563 4.800781 L 12.800781 0 L 22.398438 0 L 25.601563 4.800781 L 32 4.800781 C 33.765625 4.800781 35.199219 6.234375 35.199219 8 L 35.199219 28.800781 C 35.199219 30.566406 33.765625 32 32 32 Z M 32 32 "
        transform="matrix(1,0,0,1,1,1)"
      />
      <G clipPath="url(#clip1)" clipRule="nonzero">
        <G clipPath="url(#clip2)" clipRule="nonzero">
          <Path
            stroke="none"
            fillRule="nonzero"
            fill={lightNavy}
            fillOpacity={1}
            d="M -0.800781 4 L 12.398438 4 L 12.398438 17.199219 L -0.800781 17.199219 Z M -0.800781 4 "
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default CameraIcon;
