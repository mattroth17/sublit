import { ActionTypes } from '../actions';

const init = {
  authenticated: false,
  username: '',
};

const AuthReducer = (state = init, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true, user: action.user };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, user: '' };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, user: '' };
    default:
      return state;
  }
};

export default AuthReducer;
