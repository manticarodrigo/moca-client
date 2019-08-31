import React, { useState, useEffect, useCallback } from 'react';
import { NavigationComponent } from 'react-navigation';
import { StatusBar } from 'react-native';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';

import { Views, Spacing, Colors } from '@src/styles';
import { BackButtonIcon, CameraIcon, SendIcon } from '@src/components/icons';

import View from '@src/components/View';
import TextInput from '@src/components/TextInput';

import ChatMessage from './ChatMessage';
import ChatHeader from './ChatHeader';

const ChatScreen: NavigationComponent = () => {
  const [{ authState: { currentUser } }] = useStore();
  const navigation = useNavigation();
  const setHeaderProps = useCallback(navigation.setParams, []);
  const [text, setText] = useState('');
  const [fetchedChat, setFetchedChat] = useState(false);
  const [chat, setChat] = useState<Chat>({
    id: null,
    messages: [],
    participants: [],
  });

  useEffect(() => {
    const onMount = async () => {
      const { params = {} } = navigation.state;

      if (params.chat && !fetchedChat) {
        setChat(params.chat);
        setFetchedChat(true);
      }
    };

    onMount();
  }, [navigation.state, fetchedChat]);

  useEffect(() => {
    if (chat.participants.length) {
      const otherParticipant = chat.participants.find(({ id }) => id !== currentUser.id);
      const { username, imageUrl } = otherParticipant;

      setHeaderProps({ title: username, img: imageUrl });
    }
  }, [chat, currentUser.id, setHeaderProps]);

  const onChangeText = (val: string) => setText(val);

  const onPressSend = () => {
    const message: Message = {
      id: `${Math.floor(Math.random() * 1000000000)}`,
      text,
      userId: currentUser.id,
      createdAt: new Date().toDateString(),
    };

    setChat({ ...chat, messages: [...chat.messages, message] });
    setText('');
  };

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
      <View variant="borderTop" row alignCenter height={72} spacing={{ p: 3 }}>
        <View spacing={{ p: 1 }}>
          <CameraIcon />
        </View>
        <View expand spacing={{ px: 2 }}>
          <TextInput
            variant="chat"
            spacing={{ px: 3 }}
            onChangeText={onChangeText}
            placeholder="Type your message..."
            value={text}
          />
        </View>
        <View spacing={{ p: 1 }} onPress={onPressSend}>
          <SendIcon active={text.length} />
        </View>
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
