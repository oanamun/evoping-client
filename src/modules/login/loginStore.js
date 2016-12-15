import { URL_API } from './../../services/Api';
import io from 'socket.io-client';

export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'login/LOGIN_ERROR';
export const LOGOUT = 'login/LOGOUT';
export const SOCKET_CONNECT = 'socket/CONNECT';

// --------- ACTION CREATORS ----------

const socketAuthenticate = (dispatch, token) => {
  const socket = io.connect(URL_API);
  console.log('pana aici 2');
  console.log(socket);
  console.log(token);
  socket.on('connect', () => {
    console.log('pana11');
    socket
      .emit('authenticate', { token })
      .on('authenticated', () => {
        console.log('auth success');
        const checkId = 1;
        socket.emit('join', checkId);
        socket.on('check', (data) => {
          console.log(data);
        });
      })
      .on('unauthorized', (msg) => {
        console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
      });
  });
};

export function login(credentials) {
  return (dispatch, getState) => {
    fetch(`${URL_API}/login`, {
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
      return { ...state };
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
