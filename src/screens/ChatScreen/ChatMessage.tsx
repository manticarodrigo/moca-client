
import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '@src/theme';
import { Shadows } from '@src/styles';

type ChatMessageProps = {
  text: string;
  alignRight: boolean;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radii[2],
    marginTop: theme.space[2],
    padding: theme.space[2],
    height: 'auto',
    ...Shadows.primary,
  },
});

const ChatMessage = ({ text, alignRight }: ChatMessageProps) => {
  const propStyles = useMemo(() => StyleSheet.create({
    view: {
      alignSelf: alignRight ? 'flex-end' : 'flex-start',
      backgroundColor: alignRight ? theme.colors.primary : theme.colors.white,
      [alignRight ? 'marginLeft' : 'marginRight']: theme.space[4],
    },
    text: {
      color: alignRight ? theme.colors.white : theme.colors.text,
    },
  }), [alignRight]);

  return (
    <View style={[styles.base, propStyles.view]}>
      <Text style={propStyles.text}>{text}</Text>
    </View>
  );
};

export default ChatMessage;
