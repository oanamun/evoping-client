export const LOGIN = 'users/LOGIN';
export const GET_USER = 'users/GET_USER';

// --------- ACTION CREATORS ----------
export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

// ------- REDUCER --------
const initialState = {
  loggedInUser: { id: 1, email: 'oana.muntean@evozon.com', password: '123' },
  token: 'asdfgasdfadsfgadsfadssf',
};

export function loginStore(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN: {
      return { ...state,
        loggedInUser: { ...state.loggedInUser, ...payload.user },
        token: payload.token,
      };
    }
    case GET_USER: {
      return { ...state, loggedInUser: { ...state.loggedInUser } };
    }
    default: {
      return state;
    }
  }
}
