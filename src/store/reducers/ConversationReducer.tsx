import { ConversationAction } from '@src/store/actions/ConversationAction';
import { UserSnippet, Message as BadMessage } from '@src/services/openapi';

export type Message = Omit<BadMessage, 'image' | 'content'> & {
  image: string;
  content: { text?: string };
}

export type Conversation = {
  user: UserSnippet;
  lastMessage: Message;
}

export type ConversationState = {
  list: Conversation[];
  map: { [userId: string]: Message[] };
}

function updateMessages(state: ConversationState, payload: { data: Message[]; userId: string }) {
  state.map = { ...state.map, [payload.userId]: payload.data };

  return state;
}

function updateMessage(state: ConversationState, payload: { data: Message; userId: string }) {
  state.map = { ...state.map, [payload.userId]: [...state.map[payload.userId], payload.data] };

  return state;
}

const reducer = (state: ConversationState, action: ConversationAction): ConversationState => {
  switch (action.type) {
    case 'GET_CONVERSATIONS_SUCCESS':
      return { ...state, list: action.payload };
    case 'GET_CONVERSATION_SUCCESS':
      return updateMessages(state, action.payload);
    case 'SEND_MESSAGE_SUCCESS':
      return updateMessage(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
