import React, { useState, useEffect, useCallback } from 'react';
import { SectionListData, StatusBar } from 'react-native';
import { NavigationComponent } from 'react-navigation';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';
import useDateSections from '@src/hooks/useDateSections';
import useScrollToStart from '@src/hooks/useScrollToStart';

import { getImage } from '@src/utlities/imagePicker';

import { Views, Spacing, Colors } from '@src/styles';

import { BackButtonIcon } from '@src/components/icons';
import View from '@src/components/View';
import Text from '@src/components/Text';
import SectionList from '@src/components/SectionList';

import ConversationHeader from './ConversationHeader';
import ConversationMessage from './ConversationMessage';
import ConversationActions from './ConversationActions';
import ConversationInputs from './ConversationInputs';

type SectionHeaderProps = {
  section: SectionListData<{ title: string; data: Message[] }>;
};

type State = Conversation & {
  text: string;
}

const ConversationScreen: NavigationComponent = () => {
  const [{ authState: { currentUser } }] = useStore();
  const navigation = useNavigation();
  const [state, setState] = useState<State>({
    id: null,
    messages: [],
    participants: [],
    text: '',
  });

  const sections = useDateSections(state.messages, (message) => message.createdAt);
  const { scrollRef, scrollToStart } = useScrollToStart({ offset: 67 /* actions height */ });

  useEffect(() => {
    const onMount = async () => {
      const { params = {} } = navigation.state;

      if (params.conversation && !state.id) {
        setState((prev) => ({ ...prev, ...params.conversation }));
      }
    };

    onMount();
  }, [navigation.state, state]);

  const setParams = useCallback(navigation.setParams, []);

  useEffect(() => {
    if (state.participants.length) {
      const otherParticipant = state.participants.find(({ id }) => id !== currentUser.id);
      const { username, imageUrl } = otherParticipant;

      setParams({ title: username, img: imageUrl });
    }
  }, [state, currentUser.id, setParams]);

  const _createMessage = (attachmentURI?: string): Message => ({
    id: `${Math.floor(Math.random() * 1000000000)}`,
    text: state.text,
    sender: currentUser.id,
    attachmentURI,
    createdAt: new Date().toDateString(),
  });

  const onChangeText = (val: string) => setState((prev) => ({ ...prev, text: val }));

  const onPressCamera = async () => {
    getImage((response) => {
      if (response.cancelled === false) {
        const message = _createMessage(response.uri);

        setState((prev) => ({ ...prev, messages: [message, ...prev.messages], text: '' }));
      }
    });
  };

  const onPressSend = () => {
    if (state.text) {
      const message = _createMessage();

      setState((prev) => ({ ...prev, messages: [message, ...prev.messages], text: '' }));
      scrollToStart();
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <ConversationMessage message={item} alignRight={item.sender === currentUser.id} />
  );

  const renderSectionHeader = ({ section: { title } }: SectionHeaderProps) => (
    <View spacing={{ ml: 3, py: 4 }}>
      <Text typography={{ size: 2, color: 'semiGrey', weight: '500', align: 'center' }}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </Text>
    </View>
  );

  const keyExtractor = (item: Message) => item.id.toString();

  return (
    <View safeArea column flex={1}>
      <StatusBar barStyle="dark-content" />
      <SectionList
        inverted
        ref={scrollRef}
        renderItem={renderItem}
        renderSectionFooter={renderSectionHeader}
        keyExtractor={keyExtractor}
        sections={sections}
        ListHeaderComponent={(
          <ConversationActions onPressInjury={scrollToStart} onPressLocation={scrollToStart} />
        )}
        bgColor="lightGrey"
      />
      <ConversationInputs
        text={state.text}
        onChangeText={onChangeText}
        onPressCamera={onPressCamera}
        onPressSend={onPressSend}
      />
    </View>
  );
};

const ConversationBackButton = (
  <View shadow={{ color: 'secondary', blur: 2, alpha: 0.16 }}>
    <BackButtonIcon />
  </View>
);

ConversationScreen.navigationOptions = ({ navigation: { state } }) => ({
  headerTitle: <ConversationHeader params={state.params} />,
  headerBackImage: ConversationBackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});

export default ConversationScreen;
