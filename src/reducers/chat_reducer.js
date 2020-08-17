import { ActionTypes } from '../actions';

const init = {
  conversations: [],
  current: {},
};

const ChatReducer = (state = init, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CONVERSATIONS:
      return { all: action.payload, current: {} };
    case ActionTypes.FETCH_CONVERSATION:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default ChatReducer;
