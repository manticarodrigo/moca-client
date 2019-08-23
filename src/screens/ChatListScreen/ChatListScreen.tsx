import React, { useEffect } from 'react';
import { SectionListData } from 'react-native';

import { Chat } from '@src/types';
import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';
import { getChats } from '@src/store/actions/ChatActions';

import { SectionList } from '@src/theme/components';
import Text from '@src/components/Text';

import useSections from './useSections';
import ChatListCard from './ChatListCard';

type SectionHeaderProps = {
  section: SectionListData<{ title: string; data: Chat[] }>;
};

const ChatListScreen = () => {
  const [{ authState, chatState }, dispatch] = useStore();
  const navigation = useNavigation();
  const sections = useSections(chatState.chats);

  useEffect(() => {
    if (authState.user) {
      dispatch(getChats(authState.user));
    }
  }, [authState.user]);

  const handleCardPress = (chat: Chat) => navigation.push('ChatScreen', { chat });

  const renderItem = ({ item }: { item: Chat }) => (
    <ChatListCard currentUser={authState.user} chat={item} onPress={handleCardPress} />
  );

  const renderSectionHeader = ({ section }: SectionHeaderProps) => (
    <Text my={2} uppercase>
      {section.title}
    </Text>
  );

  const keyExtractor = (item: Chat) => item.id.toString();

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
