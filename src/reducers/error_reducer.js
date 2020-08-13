import { ActionTypes } from '../actions';

const initialState = {
  isError: false,
  errorMessage: '',
};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ERROR_SET:
      return { isError: true, errorMessage: action.error.message };
    case ActionTypes.ERROR_CLEAR:
      return { isError: false, errorMessage: '' };
    case ActionTypes.AUTH_ERROR:
      return { isError: true, errorMessage: action.message };
    default:
      return state;
  }
};

export default ErrorReducer;