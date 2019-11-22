import React, { useState, useEffect } from 'react';
import { StatusBar, SectionList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';

import { UserSnippet } from '@src/services/openapi';
import { Message } from '@src/store/reducers/ConversationReducer';

import api from '@src/services/api';

import { getConversation, sendMessage } from '@src/store/actions/ConversationAction';
import { answerAppointmentRequest } from '@src/store/actions/AppointmentAction';

import useStore from '@src/hooks/useStore';
import useDateSections from '@src/hooks/useDateSections';
import useScrollToStart from '@src/hooks/useScrollToStart';

import { Views, Colors } from '@src/styles';

import ProfileModal from '@src/modals/ProfileModal';
import MessageFormModal from '@src/modals/MessageFormModal';
import AppointmentRequestModal from '@src/modals/AppointmentRequestModal';
import InfoListModal from '@src/modals/InfoListModal';

import { InfoIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Toast from '@src/components/Toast';

import ConversationMessage from './ConversationMessage';
import ConversationActions from './ConversationActions';
import ConversationInputs from './ConversationInputs';

const ConversationSectionList: SectionList<Message> = SectionList;

type Props = NavigationStackScreenProps & { isFocused: boolean }

type ModalState = {
  profile?: boolean;
  message?: boolean;
  appointment?: boolean;
  injury?: boolean;
}

type ToastState = {
  type: 'success' | 'error';
  message: string;
}

const ConversationScreen: NavigationStackScreenComponent = ({ navigation, isFocused }: Props) => {
  const { store, dispatch } = useStore();
  const [otherUser, setOtherUser] = useState<UserSnippet>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [modalState, setModalState] = useState<ModalState>({});
  const [toastState, setToastState] = useState<ToastState>();

  const isTherapist = store.user.type === 'PT';

  const sections = useDateSections<Message>(
    messages,
    (message) => message.createdAt.toString(),
  );

  const { setRef, scrollToStart } = useScrollToStart<Message>({ offset: 67 /* actions */ });

  const onPressProfile = () => setModalState({ profile: true });
  const onPressCamera = () => setModalState({ message: true });
  const onPressAppointment = () => setModalState({ appointment: true });
  const onPressInjury = () => setModalState({ injury: true });
  const onCloseModals = () => setModalState({});

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

    navigation.setParams({ onPressProfile });
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

  const onChangeText = (text: string) => setInputText(text);

  const onPressSend = async () => {
    const { params = {} } = navigation.state;

    if (inputText) {
      try {
        await dispatch(sendMessage(params.user.id, { text: inputText }));

        setInputText('');
        scrollToStart();
      } catch {
        setToastState({ type: 'error', message: 'There was an issue sending your message.' });
      }
    }
  };

  const onSubmitForm = async (fields) => {
    const { params = {} } = navigation.state;

    try {
      await dispatch(sendMessage(params.user.id, fields));

      setInputText('');
      scrollToStart();
      setToastState({ type: 'success', message: 'Successfully sent your message.' });
    } catch {
      setToastState({ type: 'error', message: 'There was an issue sending your message.' });
    } finally {
      onCloseModals();
    }
  };

  const onSelectInjury = ({ title, description, images }) => {
    onSubmitForm({ title, text: description, images });
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
      <StatusBar barStyle="dark-content" />

      <ProfileModal
        userId={(otherUser || {}).id}
        visible={modalState.profile}
        onMessage={onCloseModals}
        onClose={onCloseModals}
      />

      <MessageFormModal
        visible={modalState.message}
        onSubmit={onSubmitForm}
        onClose={onCloseModals}
      />

      {isTherapist && (
        <AppointmentRequestModal
          patient={otherUser}
          visible={modalState.appointment}
          onClose={onCloseModals}
        />
      )}

      {!isTherapist && (
        <InfoListModal
          visible={modalState.injury}
          profile={store.user}
          type="injuries"
          singularTitle="Injury"
          pluralTitle="Injuries"
          onPress={onSelectInjury}
          onClose={onCloseModals}
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
              onPressImage={() => null}
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
              onPressAppointment={onPressAppointment}
              onPressInjury={onPressInjury}
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

      {!!toastState && (
        <Toast error={toastState.type === 'error'} onClose={() => setToastState(undefined)}>
          {toastState.message}
        </Toast>
      )}
    </>
  );
};

type Params = {
  user?: UserSnippet;
  onPressProfile?: () => void;
}

const Title = ({ user, onPressProfile }: Params) => (
  <View row flex={1} alignCenter onPress={onPressProfile}>
    <Image rounded size={48} uri={user.image || undefined} />
    <Text variant="semiBoldLarge" ml={3}>
      {user.firstName}
      {' '}
      {user.lastName}
    </Text>
  </View>
);

const Right = ({ onPressProfile }: Params) => (
  <View py={3} px={4} onPress={onPressProfile}>
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
