import React from 'react'
import Svg, { G, Rect, Path } from 'react-native-svg'

const ArrowDown = ({ large = false }) => (
  <Svg width={large ? 25 : 19} height={large ? 15 : 11} viewBox="0 0 19 11">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-1071.000000, -624.000000)">
        <G id="arrow-down-light" transform="translate(1068.000000, 618.000000)">
          <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={2} />
          <G
            id="right-arrow"
            transform="translate(12.500000, 12.000000) rotate(90.000000) translate(-12.500000, -12.000000) translate(7.000000, 3.000000)"
            fill="#C5D2DC"
            fillRule="nonzero"
          >
            <Path
              d="M10.0789625,7.92106252 L2.5789677,0.421067738 C1.99039978,-0.147390181 1.05484159,-0.139260433 0.476241296,0.439339862 C-0.102359,1.01794016 -0.110488747,1.95349834 0.457969171,2.54206626 L6.89746469,8.98156178 L0.457969171,15.4210573 C0.068034566,15.7976687 -0.0883493443,16.3553735 0.0489237211,16.8798173 C0.186196787,17.4042611 0.595763942,17.8138282 1.12020772,17.9511013 C1.64465151,18.0883743 2.20235625,17.9319904 2.5789677,17.5420558 L10.0789625,10.042061 C10.664535,9.45631168 10.664535,8.50681189 10.0789625,7.92106252 Z"
              id="Path"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
)

export default ArrowDown;
