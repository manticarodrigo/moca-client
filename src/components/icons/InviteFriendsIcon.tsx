import React from 'react';
import Svg, { G, Rect, Path } from 'react-native-svg';

const InviteFriendsIcon = () => (
  <Svg width="24px" height="20px" viewBox="0 0 24 20">
    <G id="Guide" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G id="Assets" transform="translate(-58.000000, -767.000000)">
        <G id="-invite-friend" transform="translate(57.000000, 766.000000)">
          <Rect id="Rectangle" x={0} y={0} width={24} height={24} rx={8} />
          <G
            id="users-mm"
            transform="translate(2.000000, 1.000000)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <Path
              d="M18,19 L22,19 L22,14.677 C21.9997412,14.2681728 21.7506505,13.9006748 21.371,13.749 L17.629,12.249 C17.2500254,12.0975967 17.001075,11.7310974 17,11.323 L17,10.445 C18.2344135,9.73660134 18.9968908,8.42323424 19,7 L19,5 C19.000321,3.57077716 18.2380521,2.24997496 17.0003891,1.53522455 C15.762726,0.820474126 14.2377433,0.820388527 13,1.535"
              id="Path"
              stroke="#BBE4F2"
            />
            <Path
              d="M13.371,14.749 L9.629,13.249 C9.25002543,13.0975967 9.00107504,12.7310974 9,12.323 L9,11.445 C10.2344135,10.7366013 10.9968908,9.42323424 11,8 L11,6 C11,3.790861 9.209139,2 7,2 C4.790861,2 3,3.790861 3,6 L3,8 C3.00310922,9.42323424 3.7655865,10.7366013 5,11.445 L5,12.323 C4.99974123,12.7318272 4.75065048,13.0993252 4.371,13.251 L0.629,14.751 C0.250025427,14.9024033 0.00107503532,15.2689026 0,15.677 L0,19 L14,19 L14,15.677 C13.9997412,15.2681728 13.7506505,14.9006748 13.371,14.749 Z"
              id="Path"
              stroke="#71CFEB"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default InviteFriendsIcon;
