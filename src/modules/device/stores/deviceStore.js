export const LOGIN = 'users/LOGIN';

// --------- ACTION CREATORS ----------
export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

// ------- REDUCER --------
const initialState = {
  loggedInUser: {},
};

export function loginStore(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN: {
      return {
        ...state,
        currentUser: { ...state.currentUser, ...payload },
      };
    }
    default: {
      return state;
    }
  }
}
