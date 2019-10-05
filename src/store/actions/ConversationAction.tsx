import { Dispatch } from 'react';

import { fetchConversations } from '@src/services/mock';

export type ConversationAction =
  | { type: 'GET_CONVERSATIONS'; payload: Conversation[] };

const getConversations = (currentUser: User) => (
  async (dispatch: Dispatch<ConversationAction>,
  ) => {
    const conversations = await fetchConversations(currentUser);

    dispatch({ type: 'GET_CONVERSATIONS', payload: conversations });
  });

export {
  getConversations,
};
