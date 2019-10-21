import React, { useState, useEffect } from 'react';
import { StatusBar, SectionList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { MessageTypeEnum, UserSnippet } from '@src/services/openapi';
import { Message } from '@src/store/reducers/ConversationReducer';
import { getConversation, sendMessage } from '@src/store/actions/ConversationAction';

import useStore from '@src/hooks/useStore';
import useDateSections from '@src/hooks/useDateSections';
import useScrollToStart from '@src/hooks/useScrollToStart';
import useImageViewer from '@src/hooks/useImageViewer';

import { getImage } from '@src/utlities/imagePicker';

import { Views, Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';

import ConversationMessage from './ConversationMessage';
import ConversationActions from './ConversationActions';
import ConversationInputs from './ConversationInputs';

type State = Message[]

const ConversationSectionList: SectionList<Message> = SectionList;

const ConversationScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();
  const [otherUser, setOtherUser] = useState<UserSnippet>();
  const [messages, setMessages] = useState<State>([]);
  const [inputText, setInputText] = useState('');

  const sections = useDateSections<Message>(
    messages,
    (message) => message.createdAt as unknown as string,
  );

  const { setRef, scrollToStart } = useScrollToStart<Message>({ offset: 67 /* actions */ });
  const { viewer, onPressImage } = useImageViewer(messages);

  useEffect(() => {
    const { params = {} } = navigation.state;

    if (!params.user) {
      return;
    }

    setOtherUser(params.user);
    navigation.setParams({ user: params.user });
  }, []);

  useEffect(() => {
    if (!otherUser) {
      return;
    }

    const updated = store.conversations.map[otherUser.id];


    if (!updated) {
      dispatch(getConversation(otherUser.id.toString()));

      return;
    }

    setMessages(updated);
  }, [otherUser, store.conversations.map, dispatch]);


  const onChangeText = (text: string) => setInputText(text);

  const onPressCamera = async () => {
    getImage((response) => {
      if (response.cancelled === false) {
        const message = { image: response.uri, type: MessageTypeEnum.Image, createdAt: new Date() };

        setMessages((prev) => ([message, ...prev]));
      }
    });
  };

  const onPressSend = async () => {
    const { params = {} } = navigation.state;

    if (inputText) {
      try {
        await dispatch(sendMessage(params.user.id.toString(), inputText));

        setInputText('');
        scrollToStart();
      } catch (error) {
        // console.log(error);
      }
    }
  };

  return (
    <>
      {viewer}
      <View safeArea column flex={1} bgColor="white">
        <StatusBar barStyle="dark-content" />
        <ConversationSectionList
          inverted
          ref={setRef}
          style={{ backgroundColor: Colors.lightGrey }}
          sections={sections}
          renderItem={({ item }) => (
            <ConversationMessage
              message={item}
              alignRight={item.user === store.user.id}
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
          keyExtractor={(item) => item.createdAt.toString()}
          ListHeaderComponent={(
            <ConversationActions onPressInjury={scrollToStart} onPressLocation={scrollToStart} />
          )}
        />
        <ConversationInputs
          text={inputText}
          onChangeText={onChangeText}
          onPressCamera={onPressCamera}
          onPressSend={onPressSend}
        />
      </View>
    </>
  );
};

type TitleProp = { user?: UserSnippet }

const Title = ({ user }: TitleProp) => (
  <View row flex={1} alignCenter>
    <Image rounded size={48} uri={user.image || undefined} />
    <Text variant="titleSmall" spacing={{ ml: 3 }}>
      {user.firstName}
      {' '}
      {user.lastName}
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
