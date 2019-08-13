import React, { useState, useEffect } from 'react';

import api from '@src/services/api';
import useNavigation from '@src/hooks/useNavigation';
import { Chat } from '@src/types';

import Flex from '@src/components/Flex';

import ChatListCard from './ChatListCard';

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

  const handleCardPress = (id: string) => navigation.push('ChatScreen', { id });

  return (
    <Flex flex="1" padding={3} bg="grey">
      {chats.map((chat, index) => (
        <ChatListCard key={index} chat={chat} onPress={handleCardPress} />
      ))}
    </Flex>
  );
};

export default ChatListScreen;
