import { URL_API } from './../../../services/Api';
import { socketAuthenticate, SOCKET_CONNECT } from '../../login/loginStore';

// --------- ACTIONS
export const GET_PROJECTS_SUCCESS = 'projects/GET_PROJECTS_SUCCESS';
export const GET_PROJECTS_ERROR = 'projects/GET_PROJECTS_ERROR';
export const ADD_PROJECT_SUCCESS = 'projects/ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_ERROR = 'projects/ADD_PROJECT_ERROR';
export const EDIT_PROJECT_SUCCESS = 'projects/EDIT_PROJECT_SUCCESS';
export const EDIT_PROJECT_ERROR = 'projects/EDIT_PROJECT_ERROR';
export const DELETE_PROJECT_SUCCESS = 'projects/DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_ERROR = 'projects/DELETE_PROJECT_ERROR';
export const LISTEN_SOCKET = 'projects/LISTEN_SOCKET';

// --------- ACTION CREATORS ----------
export function getProjects(handler = () => {
  console.log('default');
}) {
  return (dispatch, getState) => {
    const token = getState().loginStore.token;
    fetch(`${URL_API}project`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((projects) => {
        dispatch({
          type: GET_PROJECTS_SUCCESS,
          payload: projects,
        });
        handler(projects.Project);
      })
      .catch(() => {
        dispatch({
          type: GET_PROJECTS_ERROR,
        });
      });
  };
}

export function addProject(project) {
  return (dispatch, getState) => {
    const token = getState().loginStore.token;
    fetch(`${URL_API}project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((newProject) => {
        dispatch({
          type: ADD_PROJECT_SUCCESS,
          payload: newProject,
        });
      })
      .catch(() => {
        dispatch({
          type: ADD_PROJECT_ERROR,
        });
      });
  };
}

export function editProject(payload) {
  return (dispatch, getState) => {
    const token = getState().loginStore.token;
    fetch(`${URL_API}project/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: payload.name }),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((newProject) => {
        dispatch({
          type: EDIT_PROJECT_SUCCESS,
          payload: newProject,
        });
      })
      .catch(() => {
        dispatch({
          type: EDIT_PROJECT_ERROR,
        });
      });
  };
}

export function deleteProject(payload) {
  return (dispatch, getState) => {
    const token = getState().loginStore.token;
    fetch(`${URL_API}project/${payload.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(() => {
        dispatch({
          type: DELETE_PROJECT_SUCCESS,
          payload,
        });
      })
      .catch(() => {
        dispatch({
          type: DELETE_PROJECT_ERROR,
        });
      });
  };
}

export function readData(projectId) {
  return (dispatch, getState) => {
    dispatch(socketAuthenticate(() => {
      const socket = getState().loginStore.socket;
      socket.emit('join', projectId);
      socket.on(projectId, (data) => {
        dispatch({
          type: LISTEN_SOCKET,
          payload: data,
        });
      });
    }));
  };
}

export function disconnectChanel(projectId) {
  return (dispatch, getState) => {
    const { socket } = getState().loginStore;
    socket.removeAllListeners(projectId);
  };
}

// ------- REDUCER --------
const initialState = {
  projects: [],
  error: '',
};

export function projectsStore(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PROJECTS_SUCCESS: {
      return { ...state, projects: payload.Project, error: '' };
    }
    case GET_PROJECTS_ERROR: {
      const error = 'There was a problem when getting the projects';
      return { ...state, error };
    }
    case ADD_PROJECT_SUCCESS: {
      const projects = state.projects.concat(payload);
      return { ...state, projects, error: '' };
    }
    case ADD_PROJECT_ERROR: {
      const error = 'There was a problem when adding the project';
      return { ...state, error };
    }
    case EDIT_PROJECT_SUCCESS: {
      const projects = state.projects.map((project) => {
        if (project.id === payload.id) {
          return payload;
        }
        return project;
      });
      return { ...state, projects, error: '' };
    }
    case EDIT_PROJECT_ERROR: {
      const error = 'There was a problem when saving the changes';
      return { ...state, error };
    }
    case DELETE_PROJECT_SUCCESS: {
      const projects = state.projects.filter((project) =>
      project.id !== parseInt(payload.id, 10));
      return { ...state, projects, error: '' };
    }
    case DELETE_PROJECT_ERROR: {
      const error = 'There was a problem when deleting the project';
      return { ...state, error };
    }
    case LISTEN_SOCKET: {
      console.log(payload);
      return state;
    }
    default: {
      return state;
    }
  }
}

function attachMembersToProject(projects, projectId, members) {
  return projects.map((project) => {
    if (project.id === projectId) {
      const newProject = project;
      newProject.members = members;
      return newProject;
    }
    return project;
  });
}
