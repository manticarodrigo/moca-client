import React, { useState, useEffect } from 'react';
import { SectionListData, StatusBar } from 'react-native';
import { NavigationComponent } from 'react-navigation';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';
import useDateSections from '@src/hooks/useDateSections';
import useScrollToStart from '@src/hooks/useScrollToStart';
import useImageViewer from '@src/hooks/useImageViewer';

import { mockImg } from '@src/services/mock';
import { getImage } from '@src/utlities/imagePicker';

import { Views, Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import SectionList from '@src/components/SectionList';

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
  const { viewer, onPressImage } = useImageViewer(state.messages);

  useEffect(() => {
    const onMount = async () => {
      const { params = {} } = navigation.state;

      if (params.conversation && !state.id) {
        setState((prev) => ({ ...prev, ...params.conversation }));
      }
    };

    onMount();
  }, [navigation.state, state]);

  useEffect(() => {
    if (state.participants.length) {
      const otherParticipant = state.participants.find(({ id }) => id !== currentUser.id);
      const { username, imageUrl } = otherParticipant;
      const setNavParams = navigation.setParams;

      setNavParams({ title: username, img: imageUrl });
    }
  }, [state, currentUser.id, navigation.setParams]);

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
    <ConversationMessage
      message={item}
      alignRight={item.sender === currentUser.id}
      onPressImage={onPressImage}
    />
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
    <>
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
      {viewer}
    </>
  );
};

type TitleParams = { img?: string; title?: string }

const Title = ({ img = mockImg, title = '' }: TitleParams) => (
  <View row flex={1} alignCenter>
    <Image rounded size={48} uri={img} />
    <Text variant="titleSmall" spacing={{ ml: 3 }}>
      {title}
    </Text>
  </View>
);

ConversationScreen.navigationOptions = ({ navigation: { state } }) => ({
  headerTitle: <Title {...state.params} />,
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});

export default ConversationScreen;
