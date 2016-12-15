import { getDevices } from '../../device/stores/deviceStore';
// --------- ACTIONS
export const GET_PROJECTS = 'projects/GET_PROJECTS';
export const ADD_PROJECT = 'projects/ADD_PROJECT';
export const EDIT_PROJECT = 'projects/EDIT_PROJECT';
export const DELETE_PROJECT = 'projects/DELETE_PROJECT';
export const ADD_MEMBER = 'projects/ADD_MEMBER';
export const REMOVE_MEMBER = 'projects/REMOVE_MEMBER';

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
  projects: [
    {
      id: 1,
      name: 'Evotalks',
      devices: [],
      members: [
        { id: 1, email: 'user1@example.com' },
        { id: 2, email: 'user2@example.com' },
      ],
    },
    {
      id: 2,
      name: 'SIIT',
      devices: [],
      members: [
        { id: 4, email: 'user4@example.com' },
        { id: 2, email: 'user2@example.com' },
        { id: 7, email: 'user7@example.com' },
      ],
    },
    {
      id: 3,
      name: 'Un doi',
      devices: [],
      members: [
        { id: 2, email: 'user2@example.com' },
        { id: 3, email: 'user3@example.com' },
      ],
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
