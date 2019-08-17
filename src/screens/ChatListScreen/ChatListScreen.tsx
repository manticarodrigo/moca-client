import React, { useState, useEffect, useMemo } from 'react';
import { format, distanceInWordsToNow } from 'date-fns';

import { fetchChats } from '@src/services/api';
import useNavigation from '@src/hooks/useNavigation';
import { Chat } from '@src/types';

import SectionList from '@src/components/SectionList';
import Text from '@src/components/Text';
import ChatListCard from './ChatListCard';

const ChatListScreen = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const onMount = async () => {
      setChats(await fetchChats());
    };

    onMount();
  }, []);

  const handleCardPress = (id: string) => navigation.push('ChatScreen', { id });

  const renderItem = ({ item, index }) => (
    <ChatListCard key={index} chat={item} onPress={handleCardPress} />
  );

  const renderSectionHeader = ({ section }) => (
    <Text mb={2} style={{ textTransform: 'uppercase' }}>{section.title}</Text>
  );

  const sections = useMemo(() => {
    return chats.reduce((map, chat) => {
      const dateStr = chat.latestMessage.createdAt;
      const sectionKey = format(dateStr, 'MM-DD-YYYY');
      const section = map[sectionKey] || {};

      map[sectionKey] = {
        title: section.title || distanceInWordsToNow(dateStr, { addSuffix: true }),
        data: Array.isArray(section.data) ? section.data.push(chat) : [chat],
      };

      return map;
    }, {});
  }, [chats]);

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
