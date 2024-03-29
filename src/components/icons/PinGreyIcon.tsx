import React from 'react';
import Svg, { G, Rect, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

const SvgComponent = (props) => (
  <Svg width="21px" height="23px" viewBox="0 0 21 23" {...props}>
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-57.000000, -988.000000)">
        <G id="pin-grey" transform="translate(55.000000, 987.000000)">
          <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={2} />
          <G
            id="square-marker"
            transform="translate(2.000000, 1.000000)"
            fill="#C5D2DC"
            fillRule="nonzero"
          >
            <Path
              d="M19.3260873,22.0869569 L0.92028987,22.0869569 C0.600949285,22.0869569 0.305536237,21.9213047 0.137123191,21.6507395 C-0.0303695657,21.379254 -0.0460144935,21.0405873 0.0966304363,20.7552974 L2.85750005,15.2335582 C3.01394932,14.9215799 3.33236962,14.7246379 3.68115948,14.7246379 L7.36231896,14.7246379 L7.36231896,16.5652177 L4.24989862,16.5652177 L2.40931888,20.2463771 L17.8370583,20.2463771 L15.9964785,16.5652177 L12.8840582,16.5652177 L12.8840582,14.7246379 L16.5652177,14.7246379 C16.9140075,14.7246379 17.2324278,14.9215799 17.3888771,15.2335582 L20.1497467,20.7552974 C20.2923916,21.0405873 20.2767467,21.379254 20.1092539,21.6507395 C19.9408409,21.9213047 19.6454278,22.0869569 19.3260873,22.0869569 Z"
              id="Path"
            />
            <Path
              d="M16.5652177,6.44202909 C16.5652177,2.88971019 13.6755075,0 10.1231886,0 C6.57086967,0 3.68115948,2.88971019 3.68115948,6.44202909 C3.68115948,9.68052914 6.08587691,12.3613335 9.2028987,12.810435 L9.2028987,18.4057974 L11.0434784,18.4057974 L11.0434784,12.810435 C14.1605002,12.3613335 16.5652177,9.68052914 16.5652177,6.44202909 Z"
              id="Path"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
