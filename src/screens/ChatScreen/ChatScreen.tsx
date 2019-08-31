import React, { useState, useEffect, useCallback } from 'react';
import { NavigationComponent } from 'react-navigation';
import { StatusBar } from 'react-native';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';

import { Views, Spacing, Colors } from '@src/styles';
import { BackButtonIcon } from '@src/components/icons';

import View from '@src/components/View';
import TextInput from '@src/components/TextInput';
import Button from '@src/components/Button';

import ChatMessage from './ChatMessage';
import ChatHeader from './ChatHeader';

const ChatScreen: NavigationComponent = () => {
  const [{ authState: { currentUser } }] = useStore();
  const navigation = useNavigation();
  const setHeaderProps = useCallback(navigation.setParams, []);
  const [text, setText] = useState('');
  const [chat, setChat] = useState<Chat>({
    id: null,
    messages: [],
    participants: [],
  });

  useEffect(() => {
    const onMount = async () => {
      const { params } = navigation.state;

      if (params.chat) {
        setChat(params.chat);
      }
    };

    onMount();
  }, [navigation.state]);

  useEffect(() => {
    if (chat.participants.length) {
      const otherParticipant = chat.participants.find(({ id }) => id !== currentUser.id);
      const { username, imageUrl } = otherParticipant;

      setHeaderProps({ title: username, img: imageUrl });
    }
  }, [chat, currentUser.id, setHeaderProps]);

  const handleChangeText = (val: string) => setText(val);
  const handlePressSend = () => setText('');

  return (
    <View safeArea column expand>
      <StatusBar barStyle="dark-content" />
      <View column expand spacing={{ p: 3 }} bgColor="lightGrey">
        {chat.messages.map((message) => (
          <ChatMessage
            key={message.id}
            alignRight={message.userId === currentUser.id}
            text={message.text}
            createdAt={message.createdAt}
          />
        ))}
      </View>
      <View variant="borderTop" row height={72} spacing={{ p: 3 }}>
        <TextInput
          variant="chat"
          expand
          spacing={{ px: 3 }}
          onChangeText={handleChangeText}
          placeholder="Type a message..."
          value={text}
        />
        <Button variant="text" onPress={handlePressSend}>Send</Button>
      </View>
    </View>
  );
};

const ChatBackButton = (
  <View shadow={{ color: 'secondary', blur: 2, alpha: 0.16 }}>
    <BackButtonIcon />
  </View>
);

ChatScreen.navigationOptions = ({ navigation: { state } }) => ({
  headerTitle: <ChatHeader params={state.params} />,
  headerBackImage: ChatBackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});

export default ChatScreen;
