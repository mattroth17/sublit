import { combineReducers } from 'redux';

import ListingReducer from './listing_reducer';
import MessageModalReducer from './message_modal_reducer';
import AuthReducer from './auth_reducer';
import ChatReducer from './chat_reducer';

const rootReducer = combineReducers({
  listings: ListingReducer,
  messageModal: MessageModalReducer,
  auth: AuthReducer,
  chat: ChatReducer,
});

export default rootReducer;
