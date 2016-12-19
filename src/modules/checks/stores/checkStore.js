import { socketAuthenticate } from 'modules/login/loginStore';
import graphStyle from '../checkStyle';
import { URL_API } from './../../../services/Api';

export const RECEIVEDCHECK = 'check/RECEIVEDCHECK';
export const GET_CHECKS = 'check/GET_CHECKS';
export const ADD_CHECK_SUCCESS = 'check/ADD_CHECK_SUCCESS';
export const ADD_CHECK_ERROR = 'check/ADD_CHECK_ERROR';

// --------- ACTION CREATORS ----------
export function getChecks() {
  return {
    type: GET_CHECKS,
  };
}

export function addCheck({ name, description, isPublic, currentProject }) {
  const check = {
    name,
    description,
    public: isPublic,
    project_id: currentProject.value,
  };
  return (dispatch, getState) => {
    const authToken = getState().loginStore.loggedInUser.token;
    const data = JSON.stringify(check);
    fetch(`${URL_API}/api/v1/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: data,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((createdCheck) => {
        dispatch({
          type: ADD_CHECK_SUCCESS,
          payload: createdCheck,
        });
      })
      .catch(() => {
        dispatch({
          type: ADD_CHECK_ERROR,
        });
      });
  };
}

export function loadGraph(checkId) {
  return (dispatch, getState) => {
    // here sould run but it has an exced limit call
    const { token } = getState().loginStore;
    console.log('missaaa');
    dispatch(socketAuthenticate(token, () => {
      console.log('growingaa');
      const socket = getState().loginStore.socket;
      console.log(socket);
      socket.emit('join', checkId);
      socket.on('check', (data) => {
        const myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
        const payload = {
          label: myDate,
          responseTime: data,
        };
        dispatch({
          type: RECEIVEDCHECK,
          payload,
        });
      });
    }));
    //   console.log('miss');
    //   const socket = getState().loginStore.socket;
    //   console.log(socket);
    //   socket.emit('join', checkId);
    //   socket.on('check', (data) => {
    //     const myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    //     const payload = {
    //       label: myDate,
    //       responseTime: data,
    //     };
    //     dispatch({
    //       type: RECEIVEDCHECK,
    //       payload,
    //     });
    //   });
    // }));
  };
}

export function disconnectChanel() {
  return (dispatch, getState) => {
    // ASK MIHAI HOW TO STOP LISTENING FROM SOCKET.IO
    const { socket } = getState().loginStore;
    socket.removeAllListeners('check');
  };
}

// ------- REDUCER --------
const initialState = {
  redirectToHome: false,
  checks: [
    {
      id: 1,
      name: 'Evo live',
      description: 'This is a summary description',
      host: 'http://evotalks.evozon.com',
      interval: 5,
      project_id: 1,
    },
    {
      id: 2,
      name: 'Evo staging',
      description: 'This is a summary description',
      host: 'http://staging-evotalks.evozon.com',
      interval: 5,
      project_id: 1,
    },
    {
      id: 3,
      name: 'SIIT',
      description: 'This is a summary description',
      host: 'http://www.scolainformaladeit.com',
      interval: 5,
      project_id: 2,
    },
    {
      id: 4,
      name: 'Un doi',
      description: 'This is a summary description',
      host: 'http://www.undoi.com',
      interval: 5,
      project_id: 3,
    },
  ],
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
    case GET_CHECKS: {
      return state;
    }
    case ADD_CHECK_SUCCESS: {
      const checks = state.checks.concat(payload);
      return { ...state, checks, redirectToHome: true };
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
            label: 'Check 1',
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
