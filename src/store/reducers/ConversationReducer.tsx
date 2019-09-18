import { ConversationAction } from '@src/store/actions/ConversationActions';

export type ConversationState = {
  conversations?: Conversation[];
};

const reducer = (state: ConversationState = {}, action: ConversationAction) => {
  switch (action.type) {
    case 'GET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
