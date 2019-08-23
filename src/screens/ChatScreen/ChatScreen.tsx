import React, { useState, useEffect } from 'react';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';
import { Chat } from '@src/types';

import { TextInput } from '@src/theme/components';
import Flex from '@src/components/Flex';
import Button from '@src/components/Button';

import ChatMessage from './ChatMessage';
import ChatHeader from './ChatHeader';

const ChatScreen = () => {
  const [{ authState }] = useStore();
  const [text, setText] = useState('');
  const navigation = useNavigation();
  const [chat, setChat] = useState<Chat>({
    id: undefined,
    messages: [],
    participants: [],
  });


  useEffect(() => {
    const onMount = async () => {
      const { params } = navigation.state;
      setChat(params.chat);
    };

    onMount();
  }, []);

  useEffect(() => {
    if (chat.participants.length) {
      const otherParticipant = chat.participants.find(({ id }) => id !== authState.user.id);

      navigation.setParams({
        title: otherParticipant.username,
        img: otherParticipant.imageUrl,
      });
    }
  }, [chat]);

  const handleChangeText = (val: string) => setText(val);
  const handlePressSend = () => setText('');

  return (
    <Flex flex safeArea direction="column">
      <Flex flex padding direction="column" bg="grey">
        {chat.messages.map((message) => (
          <ChatMessage
            key={message.id}
            alignRight={message.userId === authState.user.id}
            text={message.text}
          />
        ))}
      </Flex>
      <Flex variant="bottomInput">
        <TextInput
          flex="1"
          height="100%"
          py={2}
          px={3}
          bg="white"
          onChangeText={handleChangeText}
          placeholder="Type a message..."
          value={text}
        />
        <Button text="Send" variant="text" onPress={handlePressSend} />
      </Flex>
    </Flex>
  );
};

ChatScreen.navigationOptions = ({ navigation: { state: { params = {} } } }) => ({
  headerTitle: <ChatHeader params={params} />,
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    height: 60,
  },
});

export default ChatScreen;
