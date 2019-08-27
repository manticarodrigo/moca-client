import React, { useEffect } from 'react';
import { SectionListData } from 'react-native';

import { Chat } from '@src/types';
import { getChats } from '@src/store/actions/ChatActions';
import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';

import Text from '@src/components/Text';
import SectionList from '@src/components/SectionList';

import useSections from './useSections';
import ChatListCard from './ChatListCard';

type SectionHeaderProps = {
  section: SectionListData<{ title: string; data: Chat[] }>;
};

const ChatListScreen = () => {
  const [{ authState: { currentUser }, chatState }, dispatch] = useStore();
  const navigation = useNavigation();
  const sections = useSections(chatState.chats);

  useEffect(() => {
    if (currentUser) {
      dispatch(getChats(currentUser));
    }
  }, [currentUser, dispatch]);

  const handleCardPress = (chat: Chat) => navigation.push('ChatScreen', { chat });

  const renderItem = ({ item }: { item: Chat }) => (
    <ChatListCard currentUser={currentUser} chat={item} onPress={handleCardPress} />
  );

  const renderSectionHeader = ({ section }: SectionHeaderProps) => (
    <Text typography={{ size: 1, transform: 'uppercase' }} spacing={['my', 3]}>
      {section.title}
    </Text>
  );

  const keyExtractor = (item: Chat) => item.id.toString();

  return (
    <SectionList
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={keyExtractor}
      sections={sections}
    />
  );
};

export default ChatListScreen;
