import React, { useEffect } from 'react';
import { SectionListData } from 'react-native';

import { getChats } from '@src/store/actions/ChatActions';
import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
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
    <View spacing={{ pt: 3, ml: 3 }}>
      <Text typography={{ size: 1, transform: 'uppercase', color: 'semiGrey' }}>
        {section.title}
      </Text>
    </View>
  );

  const keyExtractor = (item: Chat) => item.id.toString();

  return (
    <SectionList
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
      keyExtractor={keyExtractor}
      sections={sections}
    />
  );
};

export default ChatListScreen;
