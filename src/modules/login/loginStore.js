import { RECEIVEDCHECK } from 'modules/checks/stores/checkStore';
import io from 'socket.io-client';

import { BASE_URL } from './../../services/Api';

export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'login/LOGIN_ERROR';
export const LOGOUT = 'login/LOGOUT';
export const SOCKET_CONNECT = 'socket/CONNECT';

// --------- ACTION CREATORS ----------

export const socketAuthenticate = (handler) =>
  (dispatch, getState) => {
    const token = getState().loginStore.token;
    const socket = io.connect(BASE_URL);
    socket.on('connect', () => {
      socket
        .emit('authenticate', { token })
        .on('authenticated', () => {
          dispatch({
            type: SOCKET_CONNECT,
            payload: {
              socket,
            },
          });
          handler();
        })
        .on('unauthorized', (msg) => {
          console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
        });
    });
  };

export function login(credentials) {
  return (dispatch, getState) => {
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((user) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user,
        });
        const { token } = getState().loginStore;
        socketAuthenticate(dispatch, token);
      })
      .catch(() => {
        dispatch({
          type: LOGIN_ERROR,
        });
      });
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

// ------- REDUCER --------
const initialState = {
  loggedInUser: getFromStorage('user') || {},
  token: getFromStorage('token') || '',
  redirectToHome: false,
  error: false,
  // socket: null,
};

export function loginStore(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_SUCCESS: {
      localStorage.setItem('user', JSON.stringify(payload));
      localStorage.setItem('token', JSON.stringify(payload.token));
      return {
        ...state,
        loggedInUser: payload,
        token: payload.token,
        redirectToHome: true,
        error: false,
      };
    }
    case SOCKET_CONNECT: {
      return {
        ...state,
        socket: payload.socket,
      };
    }
    case LOGIN_ERROR: {
      return { ...state, error: true };
    }
    case LOGOUT: {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return { ...state, loggedInUser: {}, token: '', redirectToHome: false };
    }
    default: {
      return state;
    }
  }
}

function getFromStorage(value) {
  if (localStorage.getItem(value)) {
    return JSON.parse(localStorage.getItem(value));
  }
  return null;
}
