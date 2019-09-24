import React, { useEffect } from 'react';
import { SectionList } from 'react-native';

import { ScreenProps } from '@src/stacks/ConversationStack';

import { getConversations } from '@src/store/actions/ConversationActions';

import useStore from '@src/hooks/useStore';
import useDateSections from '@src/hooks/useDateSections';

import View from '@src/components/View';
import Text from '@src/components/Text';

import ConversationListCard from './ConversationListCard';

type Props = ScreenProps<'ConversationListScreen'>;

const ConversationSectionList: SectionList<Conversation> = SectionList;

const ConversationListScreen = ({ navigation }: Props) => {
  const { store, dispatch } = useStore();
  const sections = useDateSections(
    store.conversations,
    ({ messages }) => messages[messages.length - 1].createdAt,
  );

  navigation.setOptions({
    title: 'Messages',
  });

  useEffect(() => {
    if (store.user.id) {
      dispatch(getConversations(store.user));
    }
  }, [store.user, dispatch]);

  const handleCardPress = (conversation: Conversation) => {
    navigation.push('ConversationScreen', { conversation });
  };

  return (
    <View column flex={1} bgColor="lightGrey">
      <ConversationSectionList
        renderItem={({ item }) => (
          <ConversationListCard
            user={store.user}
            conversation={item}
            onPress={handleCardPress}
          />
        )}
        renderSectionHeader={({ section }) => (
          <View spacing={{ ml: 3, py: 3 }}>
            <Text typography={{ size: 2, color: 'semiGrey', weight: '500' }}>
              {section.title.charAt(0).toUpperCase() + section.title.slice(1)}
            </Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item) => item.id}
        sections={sections}
      />
    </View>
  );
};

export default ConversationListScreen;
