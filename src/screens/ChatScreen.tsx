import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components/native';

import api from '@src/services/api';
import useNavigation from '@src/hooks/useNavigation';
import { MessagePage } from '@src/types';
import { userImgSrc } from '@src/constants/urls';

import SafeAreaFlex from '@src/components/SafeAreaFlex';
import MessageBubble from '@src/components/MessageBubble';
import ChatHeader from '@src/components/ChatHeader';

const ChatMessageList = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f2f2f2;
`;

const ChatActions = styled.View`
  display: flex;
  flex-direction: row;
  height: 60px;
  width: 100%;
  border-top-color: #ddd;
  border-top-width: 1px;
  background-color: #fff;
`;

const ChatTextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  padding: 10px 15px;
  background-color: #fff;
`;

const ChatSendButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 80px;
  background-color: #fff;
`;

const ChatSendButtonText = styled.Text`
  color: #ddd;
  font-weight: 700;
`;

const currentUserId = 1;

const ChatScreen = () => {
  const [page, setPage] = useState<MessagePage>({ messages: [], participants: [] });
  const [text, setText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchChat = async () => {
      const { params: { id } } = navigation.state;
      const { data } = await api.get(`chat/${id}/`);

      setPage(data);
    };

    fetchChat();
  }, []);

  useEffect(() => {
    if (page.participants.length) {
      navigation.setParams({
        title: page.participants
          .filter(({ id }) => id !== currentUserId)
          .map(({ username }) => username)
          .join(', '),
        img: userImgSrc,
      });
    }
  }, [page]);

  const handleChangeText = (val: string) => setText(val);
  const handlePressSend = () => setText('');

  return (
    <SafeAreaFlex bgColor="white">
      <ChatMessageList>
        {page.messages.map((message, index) => (
          <MessageBubble key={index} alignRight={message.user === currentUserId}>
            {message.text}
          </MessageBubble>
        ))}
      </ChatMessageList>
      <ChatActions>
        <ChatTextInput
          onChangeText={handleChangeText}
          placeholder="Type a message..."
          value={text}
        />
        <ChatSendButton onPress={handlePressSend}>
          <ChatSendButtonText>Send</ChatSendButtonText>
        </ChatSendButton>
      </ChatActions>
    </SafeAreaFlex>
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
