import { URL_API } from './../../../services/Api';

// --------- ACTIONS
export const GET_PROJECTS_SUCCESS = 'projects/GET_PROJECTS_SUCCESS';
export const GET_PROJECTS_ERROR = 'projects/GET_PROJECTS_ERROR';
export const ADD_PROJECT_SUCCESS = 'projects/ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_ERROR = 'projects/ADD_PROJECT_ERROR';
export const EDIT_PROJECT_SUCCESS = 'projects/EDIT_PROJECT_SUCCESS';
export const EDIT_PROJECT_ERROR = 'projects/EDIT_PROJECT_ERROR';
export const DELETE_PROJECT_SUCCESS = 'projects/DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_ERROR = 'projects/DELETE_PROJECT_ERROR';
export const ADD_MEMBER = 'projects/ADD_MEMBER';
export const REMOVE_MEMBER = 'projects/REMOVE_MEMBER';

// --------- ACTION CREATORS ----------
export function getProjects() {
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

export function addMember(payload) {
  return {
    type: ADD_MEMBER,
    payload,
  };
}

export function removeMember(payload) {
  return {
    type: REMOVE_MEMBER,
    payload,
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
    case ADD_MEMBER: {
      const project = state.projects.find((proj) => proj.id === payload.project_id);
      const members = project.members.concat(payload.user);
      return { ...state, projects: attachMembersToProject(state.projects, project.id, members) };
    }
    case REMOVE_MEMBER: {
      const project = state.projects.find((proj) => proj.id === payload.project_id);
      const members = project.members.filter((member) =>
      member.id !== parseInt(payload.member_id, 10));
      return { ...state, projects: attachMembersToProject(state.projects, project.id, members) };
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
