import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SectionListData, SectionList as RNSectionList, StatusBar } from 'react-native';
import { NavigationComponent } from 'react-navigation';

import useStore from '@src/hooks/useStore';
import useNavigation from '@src/hooks/useNavigation';
import useDateSections from '@src/hooks/useDateSections';

import { Views, Spacing, Colors } from '@src/styles';
import { BackButtonIcon, CameraIcon, SendIcon, DiagnosisIcon, PinIcon } from '@src/components/icons';

import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import TextInput from '@src/components/TextInput';
import SectionList from '@src/components/SectionList';

import ConversationMessage from './ConversationMessage';
import ConversationHeader from './ConversationHeader';

type SectionHeaderProps = {
  section: SectionListData<{ title: string; data: Message[] }>;
};

type State = Conversation & {
  text: string;
}

const ConversationActions = ({ onPressInjury, onPressLocation }) => (
  <View scroll horizontal row spacing={{ p: 3 }}>
    <Button
      variant="primarySmall"
      icon={<DiagnosisIcon size={0.4} tint="white" />}
      spacing={{ mr: 2 }}
      onPress={onPressInjury}
    >
      Add Injury Info
    </Button>
    <Button
      variant="primarySmall"
      icon={<PinIcon size={0.6} tint="white" />}
      spacing={{ mr: 2 }}
      onPress={onPressLocation}
    >
      Add Location
    </Button>
  </View>
);

const ConversationInputs = ({ text, onChangeText, onPressSend }) => (
  <View variant="borderTop" row alignCenter height={72} spacing={{ p: 3 }}>
    <View spacing={{ p: 1 }}>
      <CameraIcon />
    </View>
    <View flex={1} spacing={{ px: 2 }}>
      <TextInput
        variant="conversation"
        spacing={{ px: 3 }}
        onChangeText={onChangeText}
        placeholder="Type your message..."
        value={text}
      />
    </View>
    <View spacing={{ p: 1 }} onPress={onPressSend}>
      <SendIcon active={text.length} />
    </View>
  </View>
);

const ConversationScreen: NavigationComponent = () => {
  const [{ authState: { currentUser } }] = useStore();
  const navigation = useNavigation();
  const [state, setState] = useState<State>({
    id: null,
    messages: [],
    participants: [],
    text: '',
  });

  const sectionListRef = useRef<RNSectionList<Message[]>>();
  const sections = useDateSections(state.messages, (message) => message.createdAt);

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

  const scrollToBottom = () => {
    const { current } = sectionListRef;

    if (current) {
      current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        viewOffset: 67,
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
        ListHeaderComponent={(
          <ConversationActions onPressInjury={scrollToBottom} onPressLocation={scrollToBottom} />
        )}
        bgColor="lightGrey"
      />
      <ConversationInputs
        text={state.text}
        onChangeText={onChangeText}
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
