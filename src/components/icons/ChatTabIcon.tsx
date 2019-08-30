import React, { useMemo } from 'react';
import Svg, { G, Circle, Rect, Path } from 'react-native-svg';

import useStore from '@src/hooks/useStore';

const white = '#fff';
const washedBlue = '#c5d2dc';
const lightBlue = '#bbe4f2';
const darkBlue = '#57b0cc';

const ChatTabIcon = ({ focused }) => {
  const [{ chatState: { chats } }] = useStore();

  const hasNotification = useMemo(() => !!chats.length, [chats]);

  return (
    <Svg width={48} height={48}>
      <G fill="none" fillRule="evenodd">
        <Circle fill={focused ? darkBlue : null} cx={24} cy={24} r={24} />
        <G transform={hasNotification ? 'translate(10 12)' : 'translate(12 12)'}>
          <Rect y={hasNotification ? 3 : null} width={24} height={24} rx={2} />
          <G
            transform={hasNotification ? 'translate(2)' : null}
            stroke={focused ? null : washedBlue}
            strokeLinecap={hasNotification ? null : 'round'}
            strokeLinejoin={hasNotification ? null : 'round'}
            strokeWidth={2}
          >
            <Path
              stroke={focused ? lightBlue : null}
              strokeLinecap={hasNotification ? 'round' : null}
              strokeLinejoin={hasNotification ? 'round' : null}
              d="M21.8 5.7v11.7h-3.6V21l-5.4-3.6h-.9"
            />
            <Path
              stroke={focused ? white : null}
              strokeLinecap={hasNotification ? 'round' : null}
              strokeLinejoin={hasNotification ? 'round' : null}
              d="M18.2 3H2v10.8h3.6v4.5l6.3-4.5h6.3z"
            />
            {hasNotification && <Circle stroke="#FFF" fill="#F53E3F" cx={19} cy={5} r={4} />}
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default ChatTabIcon;
