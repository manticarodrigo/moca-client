import React, { useState, useEffect, useMemo } from 'react';
import { format, distanceInWordsToNow } from 'date-fns';

import api from '@src/services/api';
import useNavigation from '@src/hooks/useNavigation';
import { Chat } from '@src/types';

import SectionList from '@src/components/SectionList';
import Text from '@src/components/Text';
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

  const sections = useMemo(() => {
    return chats.reduce((map, chat) => {
      const date = format(chat.createdAt, 'DD.MM.YYYY');
      const distance = distanceInWordsToNow(chat.createdAt, { addSuffix: true });
      const section = map[date] || {};

      map[date] = {
        title: section.title || distance,
        data: Array.isArray(section.data) ? section.data.push(chat) : [chat],
      };

      return map;
    }, {});
  }, [chats]);

  const renderItem = ({ item, index }) => (
    <ChatListCard key={index} chat={item} onPress={handleCardPress} />
  );

  const renderSectionHeader = ({ section }) => (
    <Text mb={2} style={{ textTransform: 'uppercase' }}>{section.title}</Text>
  );

  return (
    <SectionList
      flex="1"
      padding={3}
      bg="grey"
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={Object.values(sections)}
    />
  );
};

export default ChatListScreen;
