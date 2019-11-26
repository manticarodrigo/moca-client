import { Dispatch } from 'react';

import { StoreState } from '@src/StoreProvider';

import api from '@src/services/api';
import { MessageTypeEnum, PriceSessionTypeEnum } from '@src/services/openapi';
import { Conversation, Message } from '@src/store/reducers/ConversationReducer';
import { ImageObject } from '@src/components/ImageSelector';

export type ConversationAction =
  | { type: 'GET_CONVERSATIONS_SUCCESS'; payload: Conversation[] }
  | { type: 'GET_CONVERSATION_SUCCESS'; payload: { data: Message[]; userId: string } }
  | { type: 'SEND_MESSAGE_SUCCESS'; payload: { data: Message; userId: string } }

export type AppointmentRequest = {
  startTime: string;
  endTime: string;
  sessionType: PriceSessionTypeEnum;
}

const getConversations = () => async (dispatch: Dispatch<ConversationAction>) => {
  const { data } = await api.chat.chatList();

  // @ts-ignore
  dispatch({ type: 'GET_CONVERSATIONS_SUCCESS', payload: data });
};

const getConversation = (userId: number) => async (dispatch: Dispatch<ConversationAction>) => {
  const { data } = await api.chat.chatRead(userId.toString());

  // @ts-ignore
  dispatch({ type: 'GET_CONVERSATION_SUCCESS', payload: { data, userId } });
};

const sendMessage = (
  userId: number,
  { title, text, images = [] }: { title?: string; text: string; images?: ImageObject[] },
) => async (dispatch: Dispatch<ConversationAction>, store: StoreState) => {
  // eslint-disable-next-line no-undef
  const data = new FormData();

  data.append('type', MessageTypeEnum.Composite);
  data.append('text', text);

  if (title) data.append('title', title);

  images.forEach(({ image }) => {
    const uriParts = image.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const name = `${store.user.id}-to-${userId}-${new Date().getTime()}.${fileType}`;
    const file = { uri: image, type: fileType, name };
    // @ts-ignore
    data.append('images', file);
  });

  const response = await api.instance.request({
    method: 'post',
    url: `${api.basePath}/chat/${userId}/`,
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  // @ts-ignore
  dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: { data: response.data, userId } });
};

const sendAppointmentRequest = (
  userId: number,
  { sessionType, startTime, endTime }: AppointmentRequest,
) => async (
  dispatch: Dispatch<ConversationAction>,
  store: StoreState,
) => {
  // eslint-disable-next-line no-undef
  const data = new FormData();

  data.append('type', MessageTypeEnum.AppointmentRequest);
  data.append('start_time', startTime);
  data.append('end_time', endTime);

  const { price } = store.user.prices.find((p) => p.sessionType === sessionType);
  if (price) data.append('price', price.toString());

  const response = await api.instance.request({
    method: 'post',
    url: `${api.basePath}/chat/${userId}/`,
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  // @ts-ignore
  dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: { data: response.data, userId } });
};

export {
  getConversations,
  getConversation,
  sendMessage,
  sendAppointmentRequest,
};
