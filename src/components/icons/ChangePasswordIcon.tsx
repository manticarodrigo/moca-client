import React from 'react';
import Svg, { G, Rect, Path, Circle } from 'react-native-svg';

const ChangePasswordIcon = () => (
  <Svg width="19px" height="22px" viewBox="0 0 19 22">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-138.000000, -766.000000)">
        <G
          id="icon-/-change-password"
          transform="translate(135.000000, 766.000000)"
        >
          <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={8} />
          <G
            id="lock"
            transform="translate(4.000000, 1.000000)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <Path
              d="M12.7272727,9.09090909 L12.7272727,4.54545455 C12.7519998,2.0603248 10.7578494,0.025477448 8.27272727,-1.27170139e-14 L8.18181818,-1.27170139e-14 C5.69668843,-0.0247271168 3.66184108,1.96942329 3.63636364,4.45454545 L3.63636364,9.09090909"
              id="Path"
              stroke="#71CFEB"
            />
            <Rect
              id="Rectangle"
              stroke="#BBE4F2"
              x={0}
              y={9.09090909}
              width={16.3636364}
              height={10.9090909}
            />
            <Circle
              id="Oval"
              stroke="#71CFEB"
              cx={8.18181818}
              cy={14.5454545}
              r={1.81818182}
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default ChangePasswordIcon;
