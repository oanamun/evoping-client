export const UPDATE_USERNAME = 'users/UPDATE_USERNAME';

// --------- ACTION CREATORS ----------
export function updateUsername(payload) {
  return {
    type: UPDATE_USERNAME,
    payload,
  };
}

// ------- REDUCER --------
const initialState = {
  currentUser: {
    name: 'Vasile',
    username: 'VasyCiobanu',
    age: 79,
  },
};

export function usersStore(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_USERNAME: {
      // TODO decide on spread/Object.assign
      return {
        ...state,
        currentUser: { ...state.currentUser, username: payload.username },
      };
    }
    default: {
      return state;
    }
  }
}
