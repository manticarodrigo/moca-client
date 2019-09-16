import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SectionListData, SectionList as RNSectionList, StatusBar } from 'react-native';
import { NavigationComponent } from 'react-navigation';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';

import { Views, Spacing, Colors } from '@src/styles';
import { BackButtonIcon, CameraIcon, SendIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import TextInput from '@src/components/TextInput';
import SectionList from '@src/components/SectionList';

import useSections from './useSections';
import ConversationMessage from './ConversationMessage';
import ConversationHeader from './ConversationHeader';

type SectionHeaderProps = {
  section: SectionListData<{ title: string; data: Message[] }>;
};

type State = Conversation & {
  text: string;
}

const ConversationScreen: NavigationComponent = () => {
  const [{ authState: { currentUser } }] = useStore();
  const navigation = useNavigation();
  const setHeaderProps = useCallback(navigation.setParams, []);
  const [state, setState] = useState<State>({
    id: null,
    messages: [],
    participants: [],
    text: '',
  });

  const sectionListRef = useRef<RNSectionList<Message[]>>();
  const sections = useSections(state.messages);

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

      setHeaderProps({ title: username, img: imageUrl });
    }
  }, [state, currentUser.id, setHeaderProps]);

  const scrollToBottom = () => {
    const { current } = sectionListRef;

    if (current) {
      current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
      });
    }
  };

  const onChangeText = (val: string) => setState((prev) => ({ ...prev, text: val }));

  const onPressSend = () => {
    if (state.text) {
      const message: Message = {
        id: `${Math.floor(Math.random() * 1000000000)}`,
        text: state.text,
        userId: currentUser.id,
        createdAt: new Date().toDateString(),
      };

      setState((prev) => ({ ...prev, messages: [message, ...prev.messages], text: '' }));
      scrollToBottom();
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <ConversationMessage
      key={item.id}
      alignRight={item.userId === currentUser.id}
      text={item.text}
      createdAt={item.createdAt}
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
    <View safeArea column flex={1}>
      <StatusBar barStyle="dark-content" />
      <SectionList
        inverted
        ref={sectionListRef}
        renderItem={renderItem}
        renderSectionFooter={renderSectionHeader}
        keyExtractor={keyExtractor}
        sections={sections}
      />
      <View variant="borderTop" row alignCenter height={72} spacing={{ p: 3 }}>
        <View spacing={{ p: 1 }} onPress={scrollToBottom}>
          <CameraIcon />
        </View>
        <View flex={1} spacing={{ px: 2 }}>
          <TextInput
            variant="conversation"
            spacing={{ px: 3 }}
            onChangeText={onChangeText}
            placeholder="Type your message..."
            value={state.text}
          />
        </View>
        <View spacing={{ p: 1 }} onPress={onPressSend}>
          <SendIcon active={state.text.length} />
        </View>
      </View>
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
