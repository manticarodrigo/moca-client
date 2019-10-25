/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Dispatch } from 'react';

import { StoreState } from '@src/StoreProvider';

import api from '@src/services/api';
import { MessageTypeEnum, PriceSessionTypeEnum } from '@src/services/openapi';
import { Conversation, Message } from '@src/store/reducers/ConversationReducer';

export type ConversationAction =
  | { type: 'GET_CONVERSATIONS_SUCCESS'; payload: Conversation[] }
  | { type: 'GET_CONVERSATION_SUCCESS'; payload: { data: Message[]; userId: string } }
  | { type: 'SEND_MESSAGE_SUCCESS'; payload: { data: Message; userId: string } }

export type AppointmentRequest = {
  startTime: Date;
  endTime: Date;
  sessionType: PriceSessionTypeEnum;
}

const getConversations = () => async (
  dispatch: Dispatch<ConversationAction>,
  store,
) => {
  const options = { headers: { Authorization: `Token ${store.user.token}` } };
  const { data } = await api.chat.chatList(options);

  // @ts-ignore
  dispatch({ type: 'GET_CONVERSATIONS_SUCCESS', payload: data });
};

const getConversation = (userId: number) => async (
  dispatch: Dispatch<ConversationAction>,
  store,
) => {
  const options = { headers: { Authorization: `Token ${store.user.token}` } };
  const { data } = await api.chat.chatRead(userId.toString(), options);

  // @ts-ignore
  dispatch({ type: 'GET_CONVERSATION_SUCCESS', payload: { data, userId } });
};

const sendMessage = (userId: number, text: string) => async (
  dispatch: Dispatch<ConversationAction>,
  store,
) => {
  const body = { type: MessageTypeEnum.Text, content: { text } };
  const options = { headers: { Authorization: `Token ${store.user.token}` } };

  // @ts-ignore
  const { data } = await api.chat.chatCreate(userId.toString(), body, options);

  // @ts-ignore
  dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: { data, userId } });
};

const sendAppointmentRequest = (
  userId: number,
  { sessionType, ...dates }: AppointmentRequest,
) => async (
  dispatch: Dispatch<ConversationAction>,
  store: StoreState,
) => {
  const options = { headers: { Authorization: `Token ${store.user.token}` } };

  const body = {
    type: MessageTypeEnum.AppointmentRequest,
    content: {
      ...dates,
      price: store.user.prices.find(
        (price) => price.sessionType === sessionType,
      ).price,
    },
  };

  // @ts-ignore
  const { data } = await api.chat.chatCreate(userId.toString(), body, options);

  // @ts-ignore
  dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: { data, userId } });
};

export {
  getConversations,
  getConversation,
  sendMessage,
  sendAppointmentRequest,
};
