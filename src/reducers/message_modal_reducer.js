import { ActionTypes } from '../actions';

const init = {
  isError: false,
  errorMessage: '',
  isMessage: false,
  otherMessage: '',
};

const MessageModalReducer = (state = init, action) => {
  switch (action.type) {
    case ActionTypes.ERROR_SET:
      return { isError: true, errorMessage: action.errorMessage };
    case ActionTypes.ERROR_OR_MESSAGE_CLEAR:
      return {
        isError: false, errorMessage: '', isMessage: false, otherMessage: '',
      };
    case ActionTypes.AUTH_ERROR:
      return { isError: true, errorMessage: action.message };
    case ActionTypes.OTHER_MESSAGE_SET:
      return { isMessage: true, otherMessage: action.message };
    default:
      return state;
  }
};

export default MessageModalReducer;
