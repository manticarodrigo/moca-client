
import React from 'react';
import View from '@src/components/View';
import Text from '@src/components/Text';

type ChatMessageProps = {
  text?: string;
  alignRight?: boolean;
};

const ChatMessage = ({ text, alignRight }: ChatMessageProps) => (
  <View
    alignSelf={alignRight ? 'flex-end' : 'flex-start'}
    marginTop={2}
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
