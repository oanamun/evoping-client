import { getDevices } from '../../device/stores/deviceStore';
// --------- ACTIONS
export const GET_PROJECTS = 'users/GET_PROJECTS';
export const ADD_PROJECT = 'users/ADD_PROJECT';
export const EDIT_PROJECT = 'users/EDIT_PROJECT';
export const DELETE_PROJECT = 'users/DELETE_PROJECT';

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

export function editProject(payload) {
  return {
    type: EDIT_PROJECT,
    payload,
  };
}

export function deleteProject(payload) {
  return (dispatch) => {
    dispatch(getDevices());
    dispatch({
      type: DELETE_PROJECT,
      payload,
    });
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
    {
      id: 3,
      name: 'Un doi',
      devices: 1,
      members: 5,
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
    case EDIT_PROJECT: {
      const projects = state.projects.map((project) => {
        if (project.id === payload.id) {
          return payload;
        }
        return project;
      });
      return { ...state, projects };
    }
    case DELETE_PROJECT: {
      const projects = state.projects.filter((project) =>
      project.id !== parseInt(payload.id, 10));
      return { ...state, projects };
    }
    default: {
      return state;
    }
  }
}
