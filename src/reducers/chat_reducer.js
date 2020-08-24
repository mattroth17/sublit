import { ActionTypes } from '../actions';

const init = {
  conversations: [],
  conversation: {},
  messages: [],
};

const ChatReducer = (state = init, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CONVERSATIONS:
      return { ...state, conversations: action.payload };
    case ActionTypes.FETCH_CONVERSATION:
      return { ...state, conversation: action.conversation, messages: action.messages };
    default:
      return state;
  }
};

export default ChatReducer;
