import React, { useState, useEffect } from 'react';
import { StatusBar, SectionList } from 'react-native';


import useStore from '@src/hooks/useStore';
import useDateSections from '@src/hooks/useDateSections';
import useScrollToStart from '@src/hooks/useScrollToStart';
import useImageViewer from '@src/hooks/useImageViewer';

import { mockImg } from '@src/services/mock';
import { getImage } from '@src/utlities/imagePicker';

import { Colors, Views } from '@src/styles';

import { InfoIcon } from '@src/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';

import { ScreenProps } from '@src/stacks/ConversationStack';

import ConversationMessage from './ConversationMessage';
import ConversationActions from './ConversationActions';
import ConversationInputs from './ConversationInputs';

type Props = ScreenProps<'conversationScreen'>;

type State = Conversation & {
  text: string;
}

const ConversationSectionList: SectionList<Message> = SectionList;

const ConversationScreen = ({ navigation, route }: Props) => {
  const { store } = useStore();
  const [state, setState] = useState<State>({
    id: null,
    messages: [],
    participants: [],
    text: '',
  });

  const sections = useDateSections<Message>(state.messages, (message) => message.createdAt);
  const { setRef, scrollToStart } = useScrollToStart<Message>({ offset: 67 /* actions */ });
  const { viewer, onPressImage } = useImageViewer(state.messages);

  useEffect(() => {
    const onMount = async () => {
      const { conversation } = route.params;

      if (conversation && !state.id) {
        setState((prev) => ({ ...prev, ...conversation }));
      }
    };

    onMount();
  }, [route.params, state]);

  useEffect(() => {
    if (state.participants.length) {
      const otherParticipant = state.participants.find(({ id }) => id !== store.user.id);
      const { username = '', imageUrl = mockImg } = otherParticipant;

      const headerTitle = () => (
        <View row flex={1} alignCenter spacing={{ px: 3 }}>
          <Image rounded size={48} uri={imageUrl} />
          <Text variant="titleSmall" spacing={{ ml: 3 }}>
            {username}
          </Text>
        </View>
      );

      const headerRight = () => <InfoIcon />;

      navigation.setOptions({
        headerTitle,
        headerStyle: {
          ...Views.borderBottom,
          backgroundColor: Colors.white,
        },
        headerRight,
      });
    }
  }, [state, store.user.id, navigation]);

  const _createMessage = (attachmentURI?: string): Message => ({
    id: `${Math.floor(Math.random() * 1000000000)}`,
    text: state.text,
    sender: store.user.id,
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

  return (
    <>
      <View safeArea column flex={1} bgColor="lightGrey">
        <StatusBar barStyle="dark-content" />
        <ConversationSectionList
          inverted
          ref={setRef}
          renderItem={({ item }) => (
            <ConversationMessage
              message={item}
              alignRight={item.sender === store.user.id}
              onPressImage={onPressImage}
            />
          )}
          renderSectionFooter={({ section: { title } }) => (
            <View spacing={{ ml: 3, py: 4 }}>
              <Text typography={{ size: 2, color: 'semiGrey', weight: '500', align: 'center' }}>
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          sections={sections}
          ListHeaderComponent={(
            <ConversationActions onPressInjury={scrollToStart} onPressLocation={scrollToStart} />
          )}
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

export default ConversationScreen;
