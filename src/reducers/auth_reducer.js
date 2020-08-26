import { ActionTypes } from '../actions';

const init = {
  authenticated: false,
  email: '',
  user: {},
};

const AuthReducer = (state = init, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true, email: action.email };
    case ActionTypes.INIT_USER:
      return { authenticated: false, email: action.email };
    case ActionTypes.FETCH_USER:
      return { ...state, user: action.payload };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, user: {}, email: '' };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, user: {}, email: '' };
    default:
      return state;
  }
};

export default AuthReducer;
