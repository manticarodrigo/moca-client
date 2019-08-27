import React, { useState, useEffect } from 'react';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';
import { Chat } from '@src/types';

import View from '@src/components/View';
import TextInput from '@src/components/TextInput';
import Button from '@src/components/Button';

import ChatMessage from './ChatMessage';
import ChatHeader from './ChatHeader';

const ChatScreen = () => {
  const [{ authState: { currentUser } }] = useStore();
  const { setParams, ...navigation } = useNavigation();
  const [text, setText] = useState('');
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
  }, [navigation.state]);

  useEffect(() => {
    if (chat.participants.length) {
      const otherParticipant = chat.participants.find(({ id }) => id !== currentUser.id);

      setParams({
        title: otherParticipant.username,
        img: otherParticipant.imageUrl,
      });
    }
  }, [chat, currentUser.id, setParams]);

  const handleChangeText = (val: string) => setText(val);
  const handlePressSend = () => setText('');

  return (
    <View safeArea alignment={['fill', 'column']}>
      <View alignment={['fill', 'column']} spacing={{ p: 3 }} background="grey">
        {chat.messages.map((message) => (
          <ChatMessage
            key={message.id}
            alignRight={message.userId === currentUser.id}
            text={message.text}
          />
        ))}
      </View>
      <View variant="chatInputContainer">
        <TextInput
          alignment="fill"
          spacing={{ py: 2, px: 3 }}
          onChangeText={handleChangeText}
          placeholder="Type a message..."
          value={text}
        />
        <Button variant="text" onPress={handlePressSend}>Send</Button>
      </View>
    </View>
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
