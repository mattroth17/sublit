import axios from 'axios';

export const ROOT_URL = 'https://sublit-cs52-project.herokuapp.com/api';

// keys for actiontypes
// going to need chat actions
export const ActionTypes = {
  FETCH_LISTINGS: 'FETCH_LISTINGS',
  FETCH_LISTING: 'FETCH_LISTING',
  AUTH_USER: 'AUTH_USER',
  FETCH_USER: 'FETCH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_CONVERSATIONS: 'FETCH_CONVERSATIONS',
  FETCH_CONVERSATION: 'FETCH_CONVERSATION',
  ERROR_SET: 'ERROR_SET',
  ERROR_CLEAR: 'ERROR_CLEAR',
};

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
// could be an issue with creating conversations here (not transactional, one could be created but the otehr might not be)
export function startConversation(email1, firstName1, firstName2, email2) {
  return (dispatch) => {
    const person1 = {
      email: email1,
      update: {
        conversations: [{
          email: email2,
          firstname: firstName2,
        }],
      },
    };
    const person2 = {
      email: email2,
      update: {
        conversations: [{
          email: email1,
          firstname: firstName1,
        }],
      },
    };
    const conversation = { email: email2, firstName: firstName2 };
    axios.put(`${ROOT_URL}/updateuserinfo`, { person1 }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        axios.put(`${ROOT_URL}/updateuserinfo`, { person2 }, { headers: { authorization: localStorage.getItem('token') } })
          .then((res) => {
            dispatch({ type: ActionTypes.FETCH_CONVERSATION, conversation, messages: [] });
          })
          .catch((err) => {
            dispatch({ type: ActionTypes.ERROR_SET, err });
          });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}
// needs to be filled in (not sure what parameters/body to send... do we need both id and convo id?)
export function getConversation(conversation, person1Email, person2Email) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/getallmessages`, { person1Email, person2Email }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        console.log(response);
        dispatch({ type: ActionTypes.FETCH_CONVERSATION, conversation, messages: response.data.messages });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function getConversations(email) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/getuser`, { email }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_CONVERSATIONS, payload: response.data.conversations });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// needs to be altered
export function sendChatMessage(message, id1, id2) {
  return (dispatch) => {
    const fields = {
      message: { message }, from: { id1 }, to: { id2 },
    };
    axios.post(`${ROOT_URL}/messages`, fields, { headers: { authorization: localStorage.getItem('token') } })
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

export function fetchUser(email) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/getuser`, { email }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USER, user: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, email });
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
        dispatch({ type: ActionTypes.AUTH_USER, email });
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
