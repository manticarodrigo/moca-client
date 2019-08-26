import { Chat } from '@src/types';
import { ChatAction } from '@src/store/actions/ChatActions';

export type ChatState = {
  chats?: Chat[];
};

const reducer = (state: ChatState = {}, action: ChatAction) => {
  switch (action.type) {
    case 'GET_CHATS':
      return {
        ...state,
        chats: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
