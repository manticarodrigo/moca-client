import { Dispatch } from 'react';

import { fetchChats } from '@src/services/mock';

export type ChatAction =
  | { type: 'GET_CHATS'; payload: Chat[] };

export const getChats = (currentUser: User) => (async (dispatch: Dispatch<ChatAction>) => {
  const chats = await fetchChats(currentUser);

  dispatch({ type: 'GET_CHATS', payload: chats });

  return chats;
});
