import React, { useEffect } from 'react';
import { SectionListData } from 'react-native';

import { getConversations } from '@src/store/actions/ConversationActions';
import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';
import useDateSections from '@src/hooks/useDateSections';

import View from '@src/components/View';
import Text from '@src/components/Text';
import SectionList from '@src/components/SectionList';

import ConversationListCard from './ConversationListCard';

type SectionHeaderProps = {
  section: SectionListData<{ title: string; data: Conversation[] }>;
};

const ConversationListScreen = () => {
  const [store, dispatch] = useStore();
  const { authState: { currentUser }, conversationState } = store;

  const navigation = useNavigation();

  const sections = useDateSections(
    conversationState.conversations,
    ({ messages }) => messages[messages.length - 1].createdAt,
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(getConversations(currentUser));
    }
  }, [currentUser, dispatch]);

  const handleCardPress = (conversation: Conversation) => navigation.push('ConversationScreen', { conversation });

  const renderItem = ({ item }: { item: Conversation }) => (
    <ConversationListCard currentUser={currentUser} conversation={item} onPress={handleCardPress} />
  );

  const renderSectionHeader = ({ section: { title } }: SectionHeaderProps) => (
    <View spacing={{ ml: 3, py: 3 }}>
      <Text typography={{ size: 2, color: 'semiGrey', weight: '500' }}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </Text>
    </View>
  );

  const keyExtractor = (item: Conversation) => item.id.toString();

  return (
    <SectionList
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
      keyExtractor={keyExtractor}
      sections={sections}
      bgColor="lightGrey"
    />
  );
};

ConversationListScreen.navigationOptions = {
  title: 'Messages',
};

export default ConversationListScreen;
