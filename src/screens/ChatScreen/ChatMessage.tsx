
import React, { useMemo } from 'react';
import { format } from 'date-fns';

import View from '@src/components/View';
import Text from '@src/components/Text';

type ChatMessageProps = {
  alignRight: boolean;
  text: string;
  createdAt: string;
};

const ChatMessage = ({ text, createdAt, alignRight }: ChatMessageProps) => {
  const time = useMemo(() => format(createdAt, 'hh:mm'), [createdAt]);

  return (
    <View column variant={alignRight ? 'msgBubbleRight' : 'msgBubbleLeft'}>
      <Text
        typography={{
          color: alignRight ? 'white' : 'dark',
          weight: '500',
          align: 'right',
        }}
      >
        {text}
      </Text>
      <Text
        spacing={{ mt: 2 }}
        typography={{
          color: alignRight ? 'secondaryLighter' : 'semiGreyAlt',
          weight: '500',
          align: 'right',
        }}
      >
        {time}
      </Text>
    </View>
  );
};

export default ChatMessage;
