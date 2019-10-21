/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Dispatch } from 'react';

import api from '@src/services/api';
import { MessageTypeEnum } from '@src/services/openapi';
import { Conversation, Message } from '@src/store/reducers/ConversationReducer';

export type ConversationAction =
  | { type: 'GET_CONVERSATIONS_SUCCESS'; payload: Conversation[] }
  | { type: 'GET_CONVERSATION_SUCCESS'; payload: { data: Message[]; userId: string } }
  | { type: 'SEND_MESSAGE_SUCCESS'; payload: { data: Message; userId: string } }

const getConversations = () => async (
  dispatch: Dispatch<ConversationAction>,
  store,
) => {
  const options = { headers: { Authorization: `Token ${store.user.token}` } };
  const { data } = await api.chat.chatList(options);

  // @ts-ignore
  dispatch({ type: 'GET_CONVERSATIONS_SUCCESS', payload: data });
};

const getConversation = (userId: string) => async (
  dispatch: Dispatch<ConversationAction>,
  store,
) => {
  const options = { headers: { Authorization: `Token ${store.user.token}` } };
  const { data } = await api.chat.chatRead(userId, options);

  // @ts-ignore
  dispatch({ type: 'GET_CONVERSATION_SUCCESS', payload: { data, userId } });
};

const sendMessage = (userId: string, content: string) => async (
  dispatch: Dispatch<ConversationAction>,
  store,
) => {
  const body = { type: MessageTypeEnum.Text, text: { content } };
  const options = { headers: { Authorization: `Token ${store.user.token}` } };
  const { data } = await api.chat.chatCreate(userId, body, options);

  // @ts-ignore
  dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: { data, userId } });
};

export {
  getConversations,
  getConversation,
  sendMessage,
};
