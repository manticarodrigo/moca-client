import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar, SectionList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import { MessageTypeEnum, UserSnippet } from '@src/services/openapi';
import { Message } from '@src/store/reducers/ConversationReducer';

import {
  getConversation,
  sendMessage,
  sendAppointmentRequest,
} from '@src/store/actions/ConversationAction';

import { answerAppointmentRequest } from '@src/store/actions/AppointmentAction';

import useStore from '@src/hooks/useStore';
import useDateSections from '@src/hooks/useDateSections';
import useScrollToStart from '@src/hooks/useScrollToStart';
import useImageViewer from '@src/hooks/useImageViewer';

import { getImage } from '@src/utlities/imagePicker';

import { Views, Colors } from '@src/styles';

import AppointmentRequestModal from '@src/modals/AppointmentRequestModal';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';

import ConversationMessage from './ConversationMessage';
import ConversationActions from './ConversationActions';
import ConversationInputs from './ConversationInputs';

const ConversationSectionList: SectionList<Message> = SectionList;

type Props = NavigationStackScreenProps & { isFocused: boolean }

const ConversationScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store, dispatch } = useStore();
  const [otherUser, setOtherUser] = useState<UserSnippet>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [appointmentModalVisible, setAppointmentModalVisible] = useState(false);

  const sections = useDateSections<Message>(
    messages,
    (message) => message.createdAt.toString(),
  );

  const { setRef, scrollToStart } = useScrollToStart<Message>({ offset: 67 /* actions */ });

  const imageUrls = useMemo(() => messages
    .filter((m) => m.content.image)
    .map((m) => m.content.image),
  [messages]);

  const { imageViewer, onPressImage } = useImageViewer(imageUrls);

  useEffect(() => {
    const { params = {} } = navigation.state;

    if (!params.user) {
      return;
    }

    setOtherUser(params.user);
  }, []);

  useEffect(() => {
    if (otherUser && isFocused) dispatch(getConversation(otherUser.id));
  }, [isFocused, otherUser, dispatch]);

  useEffect(() => {
    if (!otherUser) return;

    const updated = store.conversations.map[otherUser.id];
    if (updated) setMessages(updated);
  }, [otherUser, store.conversations.map]);


  const onChangeText = (text: string) => setInputText(text);

  const onPressCamera = async () => {
    getImage((response) => {
      if (response.cancelled === false) {
        const message = {
          type: MessageTypeEnum.Image,
          content: { image: response.uri },
          user: store.user.id,
          createdAt: new Date(),
        };

        setMessages((prev) => ([...prev, message]));
      }
    });
  };

  const onPressSend = async () => {
    const { params = {} } = navigation.state;

    if (inputText) {
      try {
        await dispatch(sendMessage(params.user.id, inputText));

        setInputText('');
        scrollToStart();
      } catch (e) {
        // console.log(e);
      }
    }
  };

  const onToggleAppointmentModal = () => setAppointmentModalVisible(!appointmentModalVisible);

  const onSubmitAppointment = async (data) => {
    try {
      await dispatch(sendAppointmentRequest(otherUser.id, data));

      setAppointmentModalVisible(false);
    } catch (e) {
      // console.log(e);
    }
  };

  const onAnswerAppointment = async (id, status) => {
    try {
      await dispatch(answerAppointmentRequest(id, status));
      await dispatch(getConversation(otherUser.id));
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <>
      {imageViewer}

      <StatusBar barStyle="dark-content" />

      <AppointmentRequestModal
        visible={appointmentModalVisible}
        onSubmit={onSubmitAppointment}
        onClose={onToggleAppointmentModal}
      />

      <View safeArea column flex={1} bgColor="white">
        <ConversationSectionList
          inverted
          ref={setRef}
          style={{ backgroundColor: Colors.lightGrey }}
          sections={sections}
          renderItem={({ item }) => (
            <ConversationMessage
              message={item}
              alignRight={item.user === store.user.id}
              otherUser={otherUser}
              onPressImage={onPressImage}
              onPressAnswer={onAnswerAppointment}
            />
          )}
          renderSectionFooter={({ section: { title } }) => (
            <View ml={3} py={4}>
              <Text variant="regular" align="center">
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.createdAt.toString()}
          ListHeaderComponent={(
            <ConversationActions
              onPressInjury={scrollToStart}
              onPressAppointment={onToggleAppointmentModal}
            />
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
    <Text variant="semiBoldLarge" ml={3}>
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

export default withNavigationFocus(ConversationScreen);
