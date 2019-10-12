import React from 'react';
import Svg, { G, Rect, Path } from 'react-native-svg';

const NotificationsIcon = () => (
  <Svg width="20px" height="21px" viewBox="0 0 20 21">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-99.000000, -767.000000)">
        <G
          id="icon-/-notifications"
          transform="translate(97.000000, 766.000000)"
        >
          <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={8} />
          <G id="bell" transform="translate(3.000000, 2.000000)">
            <Path
              d="M14.7826087,8.69565217 L14.7826087,6.08695652 C14.7826086,2.7252233 12.0573854,9.07027203e-08 8.69565217,9.07027203e-08 C5.33391895,9.07027203e-08 2.6086957,2.7252233 2.60869565,6.08695652 L2.60869565,8.69565217 C2.60869565,11.5652174 -1.77635684e-15,12.2608696 -1.77635684e-15,13.9130435 C-1.77635684e-15,15.3913043 3.39130435,16.5217391 8.69565217,16.5217391 C14,16.5217391 17.3913043,15.3913043 17.3913043,13.9130435 C17.3913043,12.2608696 14.7826087,11.5652174 14.7826087,8.69565217 Z"
              id="Path"
              stroke="#71CFEB"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M8.69565217,18.2608696 C7.81652174,18.2608696 6.99043478,18.2313043 6.21304348,18.173913 C6.55318756,19.2589442 7.55855476,19.9973845 8.69565217,19.9973845 C9.83274959,19.9973845 10.8381168,19.2589442 11.1782609,18.173913 C10.4008696,18.2313043 9.57478261,18.2608696 8.69565217,18.2608696 Z"
              id="Path"
              fill="#BBE4F2"
              fillRule="nonzero"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default NotificationsIcon;
