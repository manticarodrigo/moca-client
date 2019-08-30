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

  const renderSectionHeader = ({ section: { title } }: SectionHeaderProps) => (
    <View spacing={{ ml: 3, py: 3 }}>
      <Text typography={{ size: 2, color: 'semiGrey', weight: '500' }}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
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

ChatListScreen.navigationOptions = {
  title: 'Messages',
};

export default ChatListScreen;
