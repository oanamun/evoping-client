import { URL_API } from './../../services/Api';

export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'login/LOGIN_ERROR';
export const LOGOUT = 'login/LOGOUT';

// --------- ACTION CREATORS ----------

export function login(credentials) {
  return (dispatch) => {
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
