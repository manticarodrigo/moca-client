import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar, SectionList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import { MessageTypeEnum, UserSnippet } from '@src/services/openapi';
import { Message } from '@src/store/reducers/ConversationReducer';

import api from '@src/services/api';

import { getConversation, sendMessage } from '@src/store/actions/ConversationAction';
import { answerAppointmentRequest } from '@src/store/actions/AppointmentAction';

import useStore from '@src/hooks/useStore';
import useDateSections from '@src/hooks/useDateSections';
import useScrollToStart from '@src/hooks/useScrollToStart';
import useImageViewer from '@src/hooks/useImageViewer';

import { getImage } from '@src/utlities/imagePicker';

import { Views, Colors } from '@src/styles';

import ProfileModal from '@src/modals/ProfileModal';
import AppointmentRequestModal from '@src/modals/AppointmentRequestModal';

import { InfoIcon } from '@src/components/icons';

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
  const [profileVisible, setProfileVisible] = useState(false);
  const [appointmentRequestVisible, setAppointmentRequestVisible] = useState(false);

  const isTherapist = store.user.type === 'PT';

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

  const onToggleProfile = () => setProfileVisible(!profileVisible);

  useEffect(() => {
    const { params = {} } = navigation.state;

    if (!params.user) {
      return;
    }

    if (!params.user.firstName) {
      const getOtherUser = async () => {
        const method = isTherapist ? api.user.userPatientRead : api.user.userTherapistRead;
        const { data } = await method(params.user.id);
        const user = data as UserSnippet;

        setOtherUser({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
        });
      };
      getOtherUser();
    }

    setOtherUser(params.user);

    navigation.setParams({ onToggleProfile });
  }, []);

  useEffect(() => {
    if (otherUser && isFocused) {
      dispatch(getConversation(otherUser.id));

      navigation.setParams({ user: otherUser });
    }
  }, [isFocused, otherUser, dispatch]);

  useEffect(() => {
    if (!otherUser) return;

    const updated = store.conversations.map[otherUser.id];
    if (updated) setMessages(updated);
  }, [store.conversations.map]);

  const onToggleAppointmentRequest = () => setAppointmentRequestVisible(!appointmentRequestVisible);

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

      <ProfileModal
        userId={profileVisible && otherUser.id}
        visible={profileVisible}
        onMessage={onToggleProfile}
        onClose={onToggleProfile}
      />

      <StatusBar barStyle="dark-content" />

      {isTherapist && (
        <AppointmentRequestModal
          patient={otherUser}
          visible={appointmentRequestVisible}
          onClose={onToggleAppointmentRequest}
        />
      )}

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
              onPressAppointment={onToggleAppointmentRequest}
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

type Params = {
  user?: UserSnippet;
  onToggleProfile?: () => void;
}

const Title = ({ user, onToggleProfile }: Params) => (
  <View row flex={1} alignCenter onPress={onToggleProfile}>
    <Image rounded size={48} uri={user.image || undefined} />
    <Text variant="semiBoldLarge" ml={3}>
      {user.firstName}
      {' '}
      {user.lastName}
    </Text>
  </View>
);

const Right = ({ onToggleProfile }: Params) => (
  <View py={3} px={4} onPress={onToggleProfile}>
    <InfoIcon />
  </View>
);

const TitleMemo = React.memo(Title);

ConversationScreen.navigationOptions = ({ navigation: { state } }) => ({
  headerTitle: <TitleMemo {...state.params} />,
  headerRight: <Right {...state.params} />,
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});

export default withNavigationFocus(ConversationScreen);
