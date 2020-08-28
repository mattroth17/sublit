import { ActionTypes } from '../actions';

// define initial state
const init = {
  all: [],
  current: {},
  filtered: [],
};

/**
 * Manages the local posts on your app
 */
const ListingReducer = (state = init, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_LISTINGS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_LISTING:
      return { ...state, current: action.payload };
    case ActionTypes.FETCH_FILTERED:
      return { ...state, current: action.payload };
    case ActionTypes.UPDATE_LISTING:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default ListingReducer;
