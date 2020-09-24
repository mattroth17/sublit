import axios from 'axios';

export const ROOT_URL = 'https://sublit-cs52-project.herokuapp.com/api';
// export const ROOT_URL = 'http://localhost:9090/api';

// keys for actiontypes
export const ActionTypes = {
  FETCH_LISTINGS: 'FETCH_LISTINGS',
  FETCH_LISTING: 'FETCH_LISTING',
  FETCH_FILTERED: 'FETCH_FILTERED',
  UPDATE_LISTING: 'UPDATE_LISTING',
  AUTH_USER: 'AUTH_USER',
  INIT_USER: 'INIT_USER',
  FETCH_USER: 'FETCH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_CONVERSATIONS: 'FETCH_CONVERSATIONS',
  FETCH_CONVERSATION: 'FETCH_CONVERSATION',
  FETCH_MESSAGE: 'FETCH_MESSAGE',
  ERROR_SET: 'ERROR_SET',
  OTHER_MESSAGE_SET: 'OTHER_MESSAGE_SET',
  ERROR_OR_MESSAGE_CLEAR: 'ERROR_OR_MESSAGE_CLEAR',
};

export function fetchFiltered(filters) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/filter`, filters, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_FILTERED, payload: response.data });
      })
      .catch((error) => {
        if (error.response && (!(typeof error.response.data === 'string') || error.response.data.includes('<'))) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else if (error.response && (typeof error.response.data === 'string')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
        }
      });
  };
}

export function clearFiltered() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_FILTERED, payload: [] });
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
        if (error.response && (!(typeof error.response.data === 'string') || error.response.data.includes('<'))) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else if (error.response && (typeof error.response.data === 'string')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
        }
      });
  };
}

// fields on listing are tentative
export function createListing(listing, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/listings`, listing, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.OTHER_MESSAGE_SET, message: 'Please wait at most 24hrs for moderators to review the listing.' });
        history.push('/');
      })
      .catch((error) => {
        if (error.response && (!(typeof error.response.data === 'string') || error.response.data.includes('<'))) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else if (error.response && (typeof error.response.data === 'string')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
        }
      });
  };
}

export function updateListing(listing, id, callback) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/listings/${id}`, listing, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_LISTING, payload: response.data });
        callback();
      })
      .catch((error) => {
        if (error.response && (!(typeof error.response.data === 'string') || error.response.data.includes('<'))) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else if (error.response && (typeof error.response.data === 'string')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
        }
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
        if (error.response && (!(typeof error.response.data === 'string') || error.response.data.includes('<'))) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else if (error.response && (typeof error.response.data === 'string')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
        }
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
        if (error.response && (!(typeof error.response.data === 'string') || error.response.data.includes('<'))) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else if (error.response && (typeof error.response.data === 'string')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
        }
      });
  };
}
// create conversation (needs to be changed after talking w/ caroline/chase)
// could be an issue with creating conversations here (not transactional, one could be created but the otehr might not be)
// need to look into preventing duplicate conversations (could be done with button in listing )
export function startConversation(user1, user2, history) {
  return (dispatch) => {
    const person1 = {
      email: user1.email,
      update: {
        conversations: [...user1.conversations, { email: user2.email, firstName: user2.firstName }],
      },
    };
    const person2 = {
      email: user2.email,
      update: {
        conversations: [...user2.conversations, { email: user1.email, firstName: user1.firstName }],
      },
    };
    const conversation = { email: user2.email, firstName: user2.firstName };
    axios.put(`${ROOT_URL}/updateuserinfo`, person1, { headers: { authorization: localStorage.getItem('token') } })
      .then(() => {
        axios.put(`${ROOT_URL}/updateuserinfo`, person2, { headers: { authorization: localStorage.getItem('token') } })
          .then(() => {
            dispatch({ type: ActionTypes.FETCH_CONVERSATION, conversation, messages: [] });
            history.push('/chat');
          })
          .catch((err) => {
            if (err.response && (!(typeof err.response.data === 'string') || err.response.data.includes('<'))) {
              dispatch({ type: ActionTypes.ERROR_SET, errorMessage: err.response.statusText });
            } else if (err.response && (typeof err.response.data === 'string')) {
              dispatch({ type: ActionTypes.ERROR_SET, errorMessage: err.response.data });
            } else {
              dispatch({ type: ActionTypes.ERROR_SET, errorMessage: err.message });
            }
          });
      })
      .catch((error) => {
        if (error.response && (!(typeof error.response.data === 'string') || error.response.data.includes('<'))) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else if (error.response && (typeof error.response.data === 'string')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
        }
      });
  };
}

export function getConversation(conversation, person1Email, person2Email, history = null) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/getallmessages`, { person1Email, person2Email }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_CONVERSATION, conversation, messages: response.data });
        if (history) {
          history.push('/chat');
        }
      })
      .catch((error) => {
        if (error.response && (!(typeof error.response.data === 'string') || error.response.data.includes('<'))) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else if (error.response && (typeof error.response.data === 'string')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
        }
        if (history) {
          history.push('/chat');
        }
      });
  };
}

export function getConversations(email) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/getuser`, { email }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_CONVERSATIONS, payload: response.data[0].conversations });
      })
      .catch((error) => {
        if (error.response && (!(typeof error.response.data === 'string') || error.response.data.includes('<'))) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else if (error.response && (typeof error.response.data === 'string')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
        }
      });
  };
}

export function sendChatMessage(senderEmail, senderFirstName, recipientEmail, recipientFirstName, text) {
  return (dispatch) => {
    const fields = {
      senderEmail, senderFirstName, recipientEmail, recipientFirstName, text,
    };
    axios.post(`${ROOT_URL}/message`, fields, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_MESSAGE, message: response.data });
      })
      .catch((error) => {
        if (error.response && (!(typeof error.response.data === 'string') || error.response.data.includes('<'))) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else if (error.response && (typeof error.response.data === 'string')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
        }
      });
  };
}

// trigger to deauth if there is error
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function fetchUser(email) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/getuser`, { email }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data[0] });
      })
      .catch((error) => {
        if (error.response && (!(typeof error.response.data === 'string') || error.response.data.includes('<'))) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.statusText });
        } else if (error.response && (typeof error.response.data === 'string')) {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.response.data });
        } else {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
        }
      });
  };
}

export function sendResetEmail({ email }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/reset`, { email })
      .then(() => {
        console.log('sent');
      })
      .catch((error) => {
        dispatch(authError(`Reset email failed to send: ${error}`));
      });
  };
}

export function resetPassword({ email, password, token }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/resetpassword`, { email, password, token })
      .then((response) => {
        history.push('/signin');
      })
      .catch((error) => {
        dispatch(authError(`Reset password failed: ${error}`));
      });
  };
}

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/getuser`, { email })
      .then((response) => {
        // email is confirmed, sign in
        if (response.data.length === 0) {
          dispatch(authError('Sign in failed: Invalid email address'));
        } else if (response.data[0].emailConfirmed) {
          axios.post(`${ROOT_URL}/signin`, { email, password })
            .then((resp) => {
              localStorage.setItem('token', resp.data.token);
              localStorage.setItem('email', email);
              localStorage.setItem('confirmed', true);
              dispatch({ type: ActionTypes.AUTH_USER, email });
              history.push('/');
            })
            .catch((err) => {
              if (err.response) {
                dispatch(authError('Sign in failed: Incorrect username or password'));
              } else {
                dispatch(authError(`Sign Up Failed: ${err}`));
              }
            });

        // email is not confirmed
        } else {
          history.push('/confirmemail');
        }
        return null;
      })
      .catch((error) => {
        dispatch(authError(`Sign in failed: ${error}`));
      });
  };
}

export function signInAndConfirmEmail({ email, password, confirmToken }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/confirmemail`, { email, confirmToken })
      .then((response) => {
        if (response.data.length === 1) {
          // token is confirmed, sign in and change emailConfirmed
          return axios.post(`${ROOT_URL}/signin`, { email, password })
            .then((resp) => {
              localStorage.setItem('token', resp.data.token);
              localStorage.setItem('email', email);

              // updateUser, make emailConfirmed: true
              const updates = {
                email,
                update: {
                  emailConfirmed: true,
                },
              };
              axios.put(`${ROOT_URL}/updateuserinfo`, updates, { headers: { authorization: resp.data.token } })
                .then(() => {
                  dispatch({ type: ActionTypes.AUTH_USER, email });
                  history.push('/');
                })
                .catch((er) => {
                  dispatch(authError(`Could not update user info: ${er}`));
                  history.push('/confirmemail');
                });
            })
            .catch((err) => {
              if (err.response) {
                dispatch(authError('Sign in failed: Incorrect username or password'));
              } else {
                dispatch(authError(`Sign Up Failed: ${err}`));
              }
            });
        // token is not confirmed
        } else {
          dispatch(authError('Could not confirm email. Confirmation link may be old.'));
        }
        return null;
      })
      .catch((error) => {
        dispatch(authError(error));
      });
  };
}

export function resendConfirmation({ email }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/resendconfirmation`, { email })
      .then(() => {
        console.log('sent');
      })
      .catch((error) => {
        dispatch(authError(error));
      });
  };
}

export function signupUser({ email, password, firstName }, history) {
  return (dispatch) => {
//     const emailPattern = /^[A-Za-z0-9._%+-]+@dartmouth.edu$/;
//     const valid = emailPattern.test(email.toLowerCase());
       const valid = true;
    if (!valid) {
      dispatch({ type: ActionTypes.AUTH_ERROR, message: 'Sign Up Failed: Email must be a valid Dartmouth address' });
    } else {
      axios.post(`${ROOT_URL}/signup`, { email, password, firstName })
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', email);
          dispatch({ type: ActionTypes.INIT_USER, email });
          history.push('/confirmemail');
        })
        .catch((error) => {
          if (error.response) {
            dispatch(authError(`Sign Up Failed: ${error.response.data.error}`));
          } else {
            dispatch(authError(`Sign Up Failed: ${error}`));
          }
        });
    }
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('confirmed');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

export function clearModal() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_OR_MESSAGE_CLEAR });
  };
}

export function sendError(message) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_SET, errorMessage: message });
  };
}
