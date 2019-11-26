import React, { useEffect } from 'react';
import { SectionList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import { Conversation } from '@src/store/reducers/ConversationReducer';
import { getConversations } from '@src/store/actions/ConversationAction';

import useStore from '@src/hooks/useStore';
import useDateSections from '@src/hooks/useDateSections';

import { NoConversationsIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

import ConversationListCard from './ConversationListCard';

const ConversationSectionList: SectionList<Conversation> = SectionList;

type Props = NavigationStackScreenProps & { isFocused: boolean }

const ConversationListScreen: NavigationStackScreenComponent = ({
  navigation,
  isFocused,
}: Props) => {
  const { store, dispatch } = useStore();

  const sections = useDateSections(
    store.conversations.list,
    // @ts-ignore
    ({ lastMessage }) => lastMessage ? lastMessage.createdAt : new Date().toISOString(),
  );

  useEffect(() => {
    if (store.user.id) {
      dispatch(getConversations());
    }
  }, [store.user, isFocused, dispatch]);

  const handleCardPress = (user: object) => {
    navigation.push('ConversationScreen', { user });
  };

  return (
    <View safeArea flex={1} bgColor="lightGrey">
      {!sections.length ? (
        <View flex={1} justifyCenter alignCenter>
          <NoConversationsIcon />
          <Text variant="title" color="semiGrey" align="center" pt={4}>
            You have not started any conversations.
          </Text>
        </View>
      ) : (
        <ConversationSectionList
          sections={sections}
          renderItem={({ item }) => (
            <ConversationListCard
              conversation={item}
              onPress={handleCardPress}
            />
          )}
          renderSectionHeader={({ section }) => (
            <View ml={3} py={3}>
              <Text variant="regular">
                {section.title.charAt(0).toUpperCase() + section.title.slice(1)}
              </Text>
            </View>
          )}
          stickySectionHeadersEnabled={false}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};

ConversationListScreen.navigationOptions = {
  title: 'Messages',
};

export default withNavigationFocus(ConversationListScreen);
