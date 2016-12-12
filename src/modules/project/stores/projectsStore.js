// --------- ACTIONS
export const GET_PROJECTS = 'users/GET_PROJECTS';
export const ADD_PROJECT = 'users/ADD_PROJECT';

// --------- ACTION CREATORS ----------
export function getProjects() {
  return {
    type: GET_PROJECTS,
  };
}

export function addProject(payload) {
  return {
    type: ADD_PROJECT,
    payload,
  };
}

// ------- REDUCER --------
const initialState = {
  projects: [],
};

export function projectsStore(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PROJECTS: {
      return { ...state, projects: payload };
    }
    case ADD_PROJECT: {
      const projects = state.project.concat(payload);
      return { ...state, projects };
    }
    default: {
      return state;
    }
  }
}
