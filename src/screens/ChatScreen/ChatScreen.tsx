import React, { useState, useEffect } from 'react';

import { fetchChat } from '@src/services/api';
import useNavigation from '@src/hooks/useNavigation';
import { MessagePage } from '@src/types';
import { placeholderImgSrc } from '@src/constants/urls';

import Flex from '@src/components/Flex';
import TextInput from '@src/components/TextInput';
import Button from '@src/components/Button';

import ChatMessage from './ChatMessage';
import ChatHeader from './ChatHeader';

const currentUserId = 2;

const ChatScreen = () => {
  const [page, setPage] = useState<MessagePage>({ messages: [], participants: [] });
  const [text, setText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const onParamsChange = async () => {
      const { params: { id } } = navigation.state;
      setPage(await fetchChat(id));
    };

    onParamsChange();
  }, [navigation.state]);

  useEffect(() => {
    if (page.participants.length && navigation) {
      navigation.setParams({
        title: page.participants
          .filter(({ id }) => id !== currentUserId)
          .map(({ username }) => username)
          .join(', '),
        img: placeholderImgSrc,
      });
    }
  }, [page, navigation]);

  const handleChangeText = (val: string) => setText(val);
  const handlePressSend = () => setText('');

  return (
    <Flex flex="1" flexDirection="column" bg="white" safeArea>
      <Flex flex="1" flexDirection="column" p={3} bg="grey">
        {page.messages.map((message) => (
          <ChatMessage
            key={message.createdAt}
            alignRight={message.user === currentUserId}
            text={message.text}
          />
        ))}
      </Flex>
      <Flex
        style={{
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        }}
        flexDirection="row"
        height={60}
        width="100%"
        bg="white"
      >
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
        <Button
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="80px"
          bg="white"
          underlayColor="#ddd"
          textProps={{ fontWeight: 400, color: 'text' }}
          onPress={handlePressSend}
        >
          Send
        </Button>
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
