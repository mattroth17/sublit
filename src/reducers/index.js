import { combineReducers } from 'redux';

import ListingReducer from './listing_reducer';
import ErrorReducer from './error_reducer';
import AuthReducer from './auth_reducer';
import ChatReducer from './chat_reducer';

const rootReducer = combineReducers({
  listings: ListingReducer,
  errors: ErrorReducer,
  auth: AuthReducer,
  chat: ChatReducer,
});

export default rootReducer;
