/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useEffect } from 'react';
import { SectionList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import { ConversationState } from '@src/store/reducers/ConversationReducer';
import { getConversations } from '@src/store/actions/ConversationAction';

import useStore from '@src/hooks/useStore';
import useDateSections from '@src/hooks/useDateSections';

import { NoConversationsIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

import ConversationListCard from './ConversationListCard';

const ConversationSectionList: SectionList<ConversationState> = SectionList;

type Props = NavigationStackScreenProps & { isFocused: boolean }

const ConversationListScreen: NavigationStackScreenComponent = ({
  navigation,
  isFocused,
}: Props) => {
  const { store, dispatch } = useStore();

  const sections = useDateSections(
    store.conversations.list,
    ({ lastMessage }) => lastMessage.createdAt as unknown as string,
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
    <View column flex={1} bgColor="lightGrey">
      {!sections.length ? (
        <View flex={1} justifyCenter alignCenter>
          <NoConversationsIcon />
          <Text variant="titleSemiGrey" typography={{ align: 'center' }} spacing={{ pt: 4 }}>
            You have not started any conversations.
          </Text>
        </View>
      ) : (
        <ConversationSectionList
          // @ts-ignore
          sections={sections}
          renderItem={({ item }) => (
            <ConversationListCard
              // @ts-ignore
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
