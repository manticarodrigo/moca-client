
import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Views, Colors } from '@src/styles';

type ChatMessageProps = {
  text: string;
  alignRight: boolean;
};

const ChatMessage = ({ text, alignRight }: ChatMessageProps) => {
  const styles = useMemo(() => StyleSheet.create({
    view: {
      ...(alignRight ? Views.msgBubbleRight : Views.msgBubbleLeft),
    },
    text: {
      color: alignRight ? Colors.white : Colors.text,
    },
  }), [alignRight]);

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ChatMessage;
