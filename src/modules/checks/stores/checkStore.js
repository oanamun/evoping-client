import { socketAuthenticate, SOCKET_CONNECT } from 'modules/login/loginStore';
import graphStyle from '../checkStyle';
import { URL_API } from './../../../services/Api';

// --------- ACTIONS ----------
export const INITGRAPH = 'check/INITGRAPH';
export const RECEIVEDCHECK = 'check/RECEIVEDCHECK';
export const GET_CHECKS_SUCCESS = 'check/GET_CHECKS_SUCCESS';
export const GET_CHECKS_ERROR = 'check/GET_CHECKS_ERROR';
export const ADD_CHECK_SUCCESS = 'check/ADD_CHECK_SUCCESS';
export const ADD_CHECK_ERROR = 'check/ADD_CHECK_ERROR';
export const DELETE_CHECK_SUCCESS = 'check/DELETE_CHECK_SUCCESS';
export const DELETE_CHECK_ERROR = 'check/DELETE_CHECK_ERROR';

// --------- ACTION CREATORS ----------
export function getChecks(projectId) {
  return (dispatch, getState) => {
    const token = getState().loginStore.token;
    fetch(`${URL_API}project/${projectId}/check`, {
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
      .then((checks) => {
        dispatch({
          type: GET_CHECKS_SUCCESS,
          payload: checks,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_CHECKS_ERROR,
        });
      });
  };
}

export function addCheck(checkParam) {
  return (dispatch, getState) => {
    const token = getState().loginStore.token;
    const check = checkParam;
    check.special_info = `{'method':'${checkParam.special_info.toUpperCase()}'}`;
    fetch(`${URL_API}check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(check),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((newCheck) => {
        dispatch({
          type: ADD_CHECK_SUCCESS,
          payload: newCheck,
        });
      })
      .catch(() => {
        dispatch({
          type: ADD_CHECK_ERROR,
        });
      });
  };
}

export function deleteCheck(payload) {
  return (dispatch, getState) => {
    const token = getState().loginStore.token;
    fetch(`${URL_API}check/${payload.id}`, {
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
        dispatch(disconnectChanel());
        dispatch({
          type: DELETE_CHECK_SUCCESS,
          payload,
        });
      })
      .catch(() => {
        dispatch({
          type: DELETE_CHECK_ERROR,
        });
      });
  };
}

export function loadGraph({ projectId, checkId }) {
  return (dispatch, getState) => {
    dispatch({
      type: INITGRAPH,
      payload: {
        checkId,
      },
    });
    dispatch(socketAuthenticate(() => {
      const socket = getState().loginStore.socket;
      socket.emit('join', projectId);
      socket.on(`${projectId}`, (data) => {
        const myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
        const payload = {
          label: myDate,
          responseTime: data.data,
        };
        if (parseInt(checkId, 10) === data.check_id) {
          dispatch({
            type: RECEIVEDCHECK,
            payload,
          });
        }
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
  checks: [],
  error: '',
  redirect: false,
  currentGraph: {
    checkId: 1,
    maxTime: 16,
    labels: [],
    datasets: [{
      label: 'Default check',
      ...graphStyle(1),
      data: [],
    }],
  },
};

export function checkStore(state = initialState, { type, payload }) {
  switch (type) {
    case GET_CHECKS_SUCCESS: {
      return { ...state, checks: payload, error: '', redirect: false };
    }
    case INITGRAPH: {
      return {
        ...initialState,
        currentGraph: {
          ...initialState.currentGraph,
          checkId: payload.checkId,
          datasets: [{
            label: `Check id: ${payload.checkId}`,
            ...graphStyle(payload.checkId),
            data: [],
          }],
        },
      };
    }
    case GET_CHECKS_ERROR: {
      const error = 'There was a problem when getting the checks';
      return { ...state, error, redirect: false };
    }
    case ADD_CHECK_SUCCESS: {
      const checks = state.checks.concat(payload);
      return { ...state, checks, error: '', redirect: true };
    }
    case ADD_CHECK_ERROR: {
      const error = 'There was a problem when adding the check';
      return { ...state, error, redirect: false };
    }
    case DELETE_CHECK_SUCCESS: {
      const checks = state.checks.filter((check) =>
      check.id !== parseInt(payload.id, 10));
      return { ...state, checks, error: '', redirect: true };
    }
    case DELETE_CHECK_ERROR: {
      const error = 'There was a problem when deleting the check';
      return { ...state, error, redirect: false };
    }
    case RECEIVEDCHECK: {
      const newLabels = state.currentGraph.labels;
      const newDatasets = state.currentGraph.datasets[0].data;
      // init the time stamp
      if (newLabels.length > state.currentGraph.maxTime) {
        // check if the time has passed
        newLabels.shift();
        newDatasets.shift();
      }
      return {
        ...state,
        currentGraph: {
          ...state.currentGraph,
          labels: [
            ...newLabels,
            payload.label,
          ],
          datasets: [{
            data: [
              ...newDatasets,
              payload.responseTime,
            ],
          }],
        },
      };
    }
    default: {
      return state;
    }
  }
}
