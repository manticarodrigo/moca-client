import React from 'react';
import Svg, { Defs, Polygon, G, Path, Mask, Use } from 'react-native-svg';

import { Colors } from '@src/styles';

const SvgComponent = ({ size = 1 }) => (
  <Svg width={131 * size} height={152 * size} viewBox="0 0 131 152">
    <Defs>
      <Polygon
        id="path-1"
        points="0 0.9062 130.650451 0.9062 130.650451 152 0 152"
      />
    </Defs>
    <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G transform="translate(-457.000000, -61.000000)">
        <G transform="translate(457.000000, 60.000000)">
          <Path
            d="M65.4413,71.7985 L86.6083,48.8185 C90.3483,44.7565 84.2883,38.6655 80.5333,42.7425 C73.4773,50.4025 66.4213,58.0635 59.3663,65.7235 C55.6263,69.7855 61.6853,75.8765 65.4413,71.7985"
            fill={Colors.primaryDark}
          />
          <Path
            d="M35.7811,66.0534 C43.1151,73.3104 50.4501,80.5674 57.7841,87.8244 C61.7181,91.7174 67.7971,85.6464 63.8591,81.7494 C56.5241,74.4924 49.1901,67.2354 41.8561,59.9784 C37.9221,56.0854 31.8431,62.1574 35.7811,66.0534"
            fill={Colors.primaryDark}
          />
          <Path
            d="M31.6336216,113.7331 C31.6887,124.0501 31.7427,124.0021 31.7977,134.3191 C31.8267,139.8541 40.4177,139.8591 40.3887733,134.3191 C40.3337,124.0021 40.2797,124.0501 40.2247,113.7331 C40.1957,108.1981 31.6037,108.1931 31.6336216,113.7331"
            fill={Colors.primaryDark}
          />
          <Path
            d="M26.9628,127.939173 C37.2798,127.8841 35.3498,127.8301 45.6668,127.7751 C51.2018,127.7461 51.2068,119.1541 45.6668,119.184022 C35.3498,119.2381 37.2798,119.2931 26.9628,119.3481 C21.4278,119.3771 21.4228,127.9681 26.9628,127.939173"
            fill={Colors.primaryDark}
          />
          <Path
            d="M65.4413,107.1769 L88.4213,83.5919 C92.2833,79.6289 86.2133,73.5479 82.3463,77.5159 C74.6863,85.3779 67.0263,93.2399 59.3663,101.1019 C55.5053,105.0649 61.5743,111.1459 65.4413,107.1769"
            fill={Colors.primaryDark}
          />
          <G transform="translate(0.000000, 0.094000)">
            <Mask id="mask-2" fill="white">
              <Use href="#path-1" />
            </Mask>
            <G id="Clip-12" />
            <Path
              d="M129.8475,52.1322 C124.3145,19.7572 93.4195,1.8732 65.6915,0.9302 C65.5585,0.9152 65.4225,0.9062 65.2785,0.9062 L65.2155,1.9842 L64.9915,0.9062 C64.7075,0.9082 64.4345,0.9292 64.2225,0.9612 C39.2655,1.8812 17.8365,14.1992 6.8985,33.9132 C-8.4865,61.6442 5.0505,89.5532 16.5715,108.1332 C17.6035,109.7972 19.2545,110.7202 21.1555,110.6622 C23.1695,110.5992 25.1455,109.3952 26.0725,107.6652 C26.9225,106.0802 26.8315,104.3042 25.8145,102.6642 C14.1645,83.8742 3.9105,61.6512 16.1975,39.2882 C25.4025,22.5322 43.7115,12.2022 65.1185,11.6542 C90.8245,12.3272 118.3415,30.2672 119.8965,59.1242 C121.1715,82.7902 105.2725,109.9082 72.5985,139.7732 C71.7985,140.2872 70.7105,140.8112 69.9335,140.4892 C69.1595,140.1702 68.5385,138.9992 68.1415,137.1052 C67.7165,135.0802 67.7435,133.0542 67.7735,130.9102 L67.9335,91.8082 C67.9365,91.3732 67.8845,90.9492 67.7735,90.4862 L67.7735,33.8942 C67.7745,27.0392 57.0345,27.0332 57.0345,33.8942 L57.0345,102.5022 L56.9545,105.9162 C56.7355,115.3312 56.5065,125.0652 57.0345,134.5562 C57.3025,139.3562 58.5275,145.8322 62.8465,149.4222 C64.9185,151.1442 67.1705,152.0002 69.5715,152.0002 C72.4265,152.0002 75.4935,150.7872 78.7195,148.3832 C79.2475,148.1242 79.6745,147.8372 80.0615,147.4842 C106.1405,123.6742 135.9455,87.8042 129.8475,52.1322"
              id="Fill-11"
              fill={Colors.primaryDark}
              mask="url(#mask-2)"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
