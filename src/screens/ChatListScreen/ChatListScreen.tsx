import React, { useState, useEffect, useMemo } from 'react';
import { SectionListData } from 'react-native';
import { format, distanceInWordsToNow } from 'date-fns';

import { Chat } from '@src/types';
import { fetchChats } from '@src/services/api';
import useNavigation from '@src/hooks/useNavigation';

import { SectionList } from '@src/theme/components';
import Text from '@src/components/Text';
import ChatListCard from './ChatListCard';

type SectionHeaderProps = {
  section: SectionListData<{ title: string; data: Chat[] }>;
};

type SectionMap = {
  [key: string]: SectionListData<{ title?: string; data: Chat[] }>;
};

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

  const renderItem = ({ item }: { item: Chat }) => (
    <ChatListCard chat={item} onPress={handleCardPress} />
  );

  const renderSectionHeader = ({ section }: SectionHeaderProps) => (
    <Text mb={2} uppercase>
      {section.title}
    </Text>
  );

  const keyExtractor = (item: Chat) => item.id;

  const sections = useMemo(() => Object.values(chats.reduce<SectionMap>((map, chat) => {
    const dateStr = chat.latestMessage.createdAt;
    const key = format(dateStr, 'MM-DD-YYYY');
    const { title = undefined, data = undefined } = map[key] || {};

    map[key] = {
      title: title || distanceInWordsToNow(dateStr, { addSuffix: true }),
      data: Array.isArray(data) ? data.concat([chat]) : [chat],
    };

    return map;
  }, {})), [chats]);

  return (
    <SectionList
      flex="1"
      padding={3}
      bg="grey"
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={keyExtractor}
      sections={sections}
    />
  );
};

export default ChatListScreen;
