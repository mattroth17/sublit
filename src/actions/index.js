import axios from 'axios';

const ROOT_URL = '';

// keys for actiontypes
// going to need chat actions
export const ActionTypes = {
  FETCH_LISTINGS: 'FETCH_LISTINGS',
  FETCH_LISTING: 'FETCH_LISTING',
  ERROR_SET: 'ERROR_SET',
  ERROR_CLEAR: 'ERROR_CLEAR',
  // UPDATE_POST: 'UPDATE_POST',
  // CREATE_POST: 'CREATE_POST',
  // DELETE_POST: 'DELETE_POST',
};

// need to incorporate sorting based on season, number of people, etc. 
export function fetchListings() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/listings`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_LISTINGS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// fields on listing are tentative
export function createListing(listing, history) {
  return (dispatch) => {
    const fields = {
      title: `${listing.title}`, description: `${listing.description}`, images: `${listing.images}`, features: `${listing.features}`, availability: `${listing.availability}`, price: `${listing.price}`,
    };
    axios.post(`${ROOT_URL}/listings`, fields)
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}


export function updateListing(post) {
  return (dispatch) => {
    const fields = {
      title: `${listing.title}`, description: `${listing.description}`, images: `${listing.images}`, features: `${listing.features}`, availability: `${listing.availability}`, price: `${listing.price}`,
    };
    axios.put(`${ROOT_URL}/listings/${post.id}`, fields)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchListing(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/listings/${id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deleteListing(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/listings/${id}`)
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// need to be filled in 
export function getMessages(id) {
  return (dispatch) => {
    
  }
}

// needs to be altered 
export function sendChatMessage(message, id1, id2) {
  return (dispatch) => {
    const fields = {
      message: {message}, from: {id1}, to: {id2},
    };
    axios.post(`${ROOT_URL}/messages`, fields)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  }
}


export function clearError() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_CLEAR });
  };
}
