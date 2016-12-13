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
  projects: [
    {
      id: 1,
      name: 'Evotalks',
      devices: 2,
      members: 12,
    },
    {
      id: 2,
      name: 'SIIT',
      devices: 5,
      members: 10,
    },
  ],
};

export function projectsStore(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PROJECTS: {
      return state;
    }
    case ADD_PROJECT: {
      const projects = state.projects.concat(payload);
      return { ...state, projects };
    }
    default: {
      return state;
    }
  }
}
