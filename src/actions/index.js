import axios from 'axios';

export const ROOT_URL = 'https://sublit-cs52-project.herokuapp.com/api';

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

export function fetchFiltered(filters) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/filter`, filters, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_FILTERED, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// need to incorporate sorting based on season, number of people, etc.
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
  console.log(listing);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/listings`, listing, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_LISTINGS });
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updateListing(listing) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/listings/${listing.id}`, listing, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_LISTING, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchListing(id) {
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
// create conversation (needs to be changed after talking w/ caroline/chase)
export function startConversation(person1, person2) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/conversations`, { person1, person2 }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        axios.put(`${ROOT_URL}/users/${person1}`, response.data.id, { headers: { authorization: localStorage.getItem('token') } })
          .then((r) => {
            dispatch({ type: ActionTypes.FETCH_CONVERSATION, payload: response.data });
          })
          .catch((e) => {
            dispatch({ type: ActionTypes.ERROR_SET, e });
          });
        axios.put(`${ROOT_URL}/users/${person2}`, response.data.id, { headers: { authorization: localStorage.getItem('token') } })
          .then((r) => {
            dispatch({ type: ActionTypes.FETCH_CONVERSATION, payload: response.data });
          })
          .catch((e) => {
            dispatch({ type: ActionTypes.ERROR_SET, e });
          });
      });
  };
}
// needs to be filled in (not sure what parameters/body to send... do we need both id and convo id?)
export function getConversation(person1, person2, convoID) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/conversations/${convoID}`, { person1, person2 }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_CONVERSATION, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
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
        dispatch({ type: ActionTypes.FETCH_CONVERSATION, payload: response.data });
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
