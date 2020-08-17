import axios from 'axios';

const ROOT_URL = 'https://sublit-cs52-project.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

// keys for actiontypes
// going to need chat actions
export const ActionTypes = {
  FETCH_LISTINGS: 'FETCH_LISTINGS',
  FETCH_LISTING: 'FETCH_LISTING',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_CONVERSATIONS: 'FETCH_CONVERSATIONS',
  FETCH_CONVERSATION: 'FETCH_CONVERSATION',
  ERROR_SET: 'ERROR_SET',
  ERROR_CLEAR: 'ERROR_CLEAR',
};

// need to incorporate sorting based on season, number of people, etc.
// right now api endpoints are 'posts'
export function fetchListings() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/listings`, { headers: { authorization: localStorage.getItem('token') } })
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
      date: `${listing.address}`,
      address: `${listing.address}`,
      rent: `${listing.rent}`,
      numberOfRooms: `${listing.numberOfRooms}`,
      isFullApartment: `${listing.isFullApartment}`,
      pictures: `${listing.pictures}`,
      numParkingSpaces: `${listing.numParkingSpaces}`,
      description: `${listing.description}`,
      renterName: `${listing.renterName}`,
      ammenities: `${listing.ammenities}`,
    };
    axios.post(`${ROOT_URL}/listings`, fields, { headers: { authorization: localStorage.getItem('token') } })
      .then((response1) => {
        history.push('/');
        // fetch
        axios.get(`${ROOT_URL}/listings`)
          .then((response) => {
            console.log(response.data);
            dispatch({ type: ActionTypes.FETCH_LISTINGS, payload: response.data });
          })
          .catch((error) => {
            // dispatch({ type: ActionTypes.ERROR_SET, error });
            console.log(error);
          });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updateListing(listing) {
  return (dispatch) => {
    const fields = {
      address: `${listing.address}`,
      rent: `${listing.rent}`,
      numberOfRooms: `${listing.numberOfRooms}`,
      isFullApartment: `${listing.isFullApartment}`,
      pictures: `${listing.pictures}`,
      numParkingSpaces: `${listing.numParkingSpaces}`,
      description: `${listing.description}`,
      renterName: `${listing.renterName}`,
      ammenities: `${listing.ammenities}`,
    };
    axios.put(`${ROOT_URL}/posts/${listing.id}`, fields, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_LISTING, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchListing(id) {
  console.log(id);
  return (dispatch) => {
    axios.get(`${ROOT_URL}/listings/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_LISTING, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deleteListing(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/listings/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// needs to be filled in
export function getConversation(id1, id2) {
  return (dispatch) => {

  };
}

export function getConversations(id) {
  return (dispatch) => {

  };
}

// needs to be altered
export function sendChatMessage(message, id1, id2) {
  return (dispatch) => {
    const fields = {
      message: { message }, from: { id1 }, to: { id2 },
    };
    axios.post(`${ROOT_URL}/messages`, fields)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// trigger to deauth if there is error
// added auth actions/reducers, still needs to be implemented on backend and in components
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, user: email });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        dispatch(authError(`Sign In Failed: ${error.response.data}`));
        history.push('/');
      });
  };
}

export function signupUser({ email, password, firstName }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, firstName })
      .then((response) => {
        console.log('test1');
        dispatch({ type: ActionTypes.AUTH_USER, user: email });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        dispatch(authError(`Sign Up Failed: ${error}`));
        history.push('/');
      });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

export function clearError() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_CLEAR });
  };
}
