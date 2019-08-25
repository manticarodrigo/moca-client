import React, { useState, useEffect } from 'react';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';
import { Chat } from '@src/types';

import Flex from '@src/components/Flex';
import TextInput from '@src/components/TextInput';
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
      const { params = {} } = navigation.state;

      if (params.chat) {
        setChat(params.chat);
      }
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
    <Flex alignment="fill" safeArea direction="column">
      <Flex alignment="fill" spacing={['p', 3]} direction="column" background="grey">
        {chat.messages.map((message) => (
          <ChatMessage
            key={message.id}
            alignRight={message.userId === authState.user.id}
            text={message.text}
          />
        ))}
      </Flex>
      <Flex variant="chatInputContainer">
        <TextInput
          alignment="fill"
          spacing={[['py', 2], ['px', 3]]}
          onChangeText={handleChangeText}
          placeholder="Type a message..."
          value={text}
        />
        <Button variant="text" onPress={handlePressSend}>Send</Button>
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
