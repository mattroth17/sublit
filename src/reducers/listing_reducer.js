import { ActionTypes } from '../actions';

// define initial state
const init = {
  all: [],
  current: {},
};

/**
 * Manages the local posts on your app
 */
const ListingReducer = (state = init, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_LISTINGS:
      return { all: action.payload, current: {} };
    case ActionTypes.FETCH_LISTING:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default ListingReducer;
