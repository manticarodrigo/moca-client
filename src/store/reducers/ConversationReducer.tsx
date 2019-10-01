import { ConversationAction } from '@src/store/actions/ConversationAction';

export type ConversationState = Conversation[];

const reducer = (state: ConversationState, action: ConversationAction): ConversationState => {
  switch (action.type) {
    case 'GET_CONVERSATIONS':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
