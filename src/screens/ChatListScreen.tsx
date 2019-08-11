import React, { useState, useEffect } from 'react';

import api from '@src/services/api';
import useNavigation from '@src/hooks/useNavigation';
import { Chat } from '@src/types';

import Flex from '@src/components/Flex';
import ChatCard from '@src/components/ChatCard';

const ChatListScreen = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await api.get('chat/');
      setChats(data);
    };

    fetchChats();
  }, []);

  return (
    <Flex padding={1} bgColor="grey">
      {chats.map((chat, index) => (
        <ChatCard key={index} chat={chat} navigation={navigation} />
      ))}
    </Flex>
  );
};

export default ChatListScreen;
