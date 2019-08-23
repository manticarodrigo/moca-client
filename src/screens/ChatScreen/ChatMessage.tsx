
import React from 'react';
import { View, Text } from '@src/theme/components';

type ChatMessageProps = {
  text?: string;
  alignRight?: boolean;
};

const ChatMessage = ({ text, alignRight }: ChatMessageProps) => (
  <View
    alignSelf={alignRight ? 'flex-end' : 'flex-start'}
    marginTop={2}
    marginRight={alignRight ? 0 : 4}
    marginLeft={alignRight ? 4 : 0}
    padding={2}
    height="auto"
    backgroundColor={alignRight ? 'primary' : 'white'}
    borderRadius={2}
    boxShadow={0}
  >
    {text && <Text color={alignRight ? 'white' : 'text'}>{text}</Text>}
  </View>
);

export default ChatMessage;
