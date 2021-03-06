import { socketAuthenticate } from './../../login/loginStore';
import graphStyle from '../deviceStyle';
import { URL_API } from './../../../services/Api';

export const RECEIVEDCHECK = 'device/RECEIVEDCHECK';
export const GET_DEVICES = 'device/GET_DEVICES';
export const ADD_DEVICE_SUCCESS = 'device/ADD_DEVICE_SUCCESS';
export const ADD_DEVICE_ERROR = 'device/ADD_DEVICE_ERROR';

// --------- ACTION CREATORS ----------
export function getDevices() {
  return {
    type: GET_DEVICES,
  };
}

export function addDevice({ name, description, isPublic, currentProject }) {
  const device = {
    name,
    description,
    public: isPublic,
    project_id: currentProject.value,
  };
  return (dispatch, getState) => {
    const authToken = getState().loginStore.loggedInUser.token;
    const data = JSON.stringify(device);
    fetch(`${URL_API}/api/v1/device`, {
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
      .then((createdDevice) => {
        dispatch({
          type: ADD_DEVICE_SUCCESS,
          payload: createdDevice,
        });
      })
      .catch(() => {
        dispatch({
          type: ADD_DEVICE_ERROR,
        });
      });
  };
}

export function loadGraph() {
  return (dispatch, getState) => {
    const checkId = getState().deviceStore.currentGraph.checkId;
    const { socket } = getState().loginStore;
    if (socket) {
      // here sould run but it has an exced limit call
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
    }
  };
}

export function disconnectChanel() {
  return (dispatch, getState) => {
    // ASK MIHAI HOW TO STOP LISTENING FROM SOCKET.IO
    // socketAuthenticate(dispatch, getState().loginStore.token);
  };
}

// ------- REDUCER --------
const initialState = {
  redirectToHome: false,
  devices: [
    {
      id: 1,
      name: 'Evo live',
      description: 'This is a summary description',
      host: 'http://evotalks.evozon.com',
      status: 1,
      project_id: 1,
    },
    {
      id: 2,
      name: 'Evo staging',
      description: 'This is a summary description',
      host: 'http://staging-evotalks.evozon.com',
      status: 0,
      project_id: 1,
    },
    {
      id: 3,
      name: 'SIIT',
      description: 'This is a summary description',
      host: 'http://www.scolainformaladeit.com',
      status: 1,
      project_id: 2,
    },
    {
      id: 4,
      name: 'Un doi',
      description: 'This is a summary description',
      host: 'http://www.undoi.com',
      status: 1,
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

export function deviceStore(state = initialState, { type, payload }) {
  switch (type) {
    case GET_DEVICES: {
      return state;
    }
    case ADD_DEVICE_SUCCESS: {
      const devices = state.devices.concat(payload);
      return { ...state, devices, redirectToHome: true };
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
