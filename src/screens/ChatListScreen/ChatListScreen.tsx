import React, { useEffect, useMemo } from 'react';
import { StyleSheet, SectionList, SectionListData } from 'react-native';

import { Chat } from '@src/types';
import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';
import { getChats } from '@src/store/actions/ChatActions';

import { theme } from '@src/theme';
import { Alignment, Spacing } from '@src/styles';
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
    <Text variant="uppercase" spacing={['my', 3]}>
      {section.title}
    </Text>
  );

  const keyExtractor = (item: Chat) => item.id.toString();

  const styles = useMemo(() => StyleSheet.create({
    list: {
      backgroundColor: theme.colors.grey,
      ...Alignment.fill,
      ...Spacing.get(['p', 3]),
    },
  }), []);

  return (
    <SectionList
      style={styles.list}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={keyExtractor}
      sections={sections}
    />
  );
};

export default ChatListScreen;
