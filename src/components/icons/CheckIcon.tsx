import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const CheckIcon = () => (
  <Svg width="24px" height="24px" viewBox="0 0 24 24">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G
        id="Assets"
        transform="translate(-217.000000, -1044.000000)"
        fill="#E2E9EE"
        fillRule="nonzero"
      >
        <G id="un-check" transform="translate(217.000000, 1044.000000)">
          <Path
            d="M12,0 C5.372583,0 0,5.372583 0,12 C0,18.627417 5.372583,24 12,24 C18.627417,24 24,18.627417 24,12 C23.9807773,5.38056166 18.6194383,0.0192227178 12,0 Z M10,17.414 L4.586,12 L6,10.586 L10,14.586 L18,6.586 L19.414,8 L10,17.414 Z"
            id="Shape"
          />
        </G>
      </G>
    </G>
  </Svg>
)

export default CheckIcon;
