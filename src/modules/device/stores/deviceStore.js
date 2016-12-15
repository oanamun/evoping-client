import graphStyle from '../deviceStyle';
import { URL_API } from './../../../services/Api';

export const RECEIVEDCHECK = 'device/RECEIVEDCHECK';
export const ADD_DEVICE = 'device/ADD_DEVICE';
export const DEVICE_SUCCESS = 'device/DEVICE_SUCCESS';
export const DEVICE_ERROR = 'device/DEVICE_ERROR';
// --------- ACTION CREATORS ----------
// export function receviedResponseTime(payload) {
//
// }
export function addDevice({ name, description, isPublic, currentProject }) {
  const device = {
    name,
    description,
    public: isPublic,
    projectId: currentProject.value,
  };
  return (dispatch) => {
    fetch(`${URL_API}/device`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(device),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          dispatch({
            type: DEVICE_SUCCESS,
            payload: response.data, //TODO update when api is available
          });
        }
        throw new Error(response.statusText);
      })
      .catch(() => {
        dispatch({
          type: DEVICE_ERROR,
        });
      });
  };
}

// ------- REDUCER --------
const initialState = {
  currentDevice: {
    id: 1,
    name: 'Device 1',
    description: 'This is a summary description',
    host: 'http://www.chris.com',
  },
  deviceList: [],
  currentGraph: {
    maxTime: 6,
    labels: [],
    datasets: [],
  },
};

export function deviceStore(state = initialState, { type, payload }) {
  switch (type) {
    case RECEIVEDCHECK: {
      // console.log(payload);
      const newLabels = state.currentGraph.labels;
      // init the time stamp
      if (state.currentGraph.labels.length > state.currentGraph.maxTime) {
        // check if the time has past
        newLabels.shift();
      }
      const newDataSets = [];
      // add values to graph
      for (let i = 0; i < payload.data.length; i = i + 1) {
        let newDataSetCheck = [];
        if (state.currentGraph.datasets[i]) {
          newDataSetCheck = state.currentGraph.datasets[i].data;
          // replace the old dots
          if (newDataSetCheck.length > state.currentGraph.maxTime) {
            newDataSetCheck.shift();
          }
          newDataSets.push({
            ...state.currentGraph.datasets[i],
            data: [
              ...newDataSetCheck,
              payload.data[i].responseMS,
            ],
          });
        } else {
          // init the check
          newDataSets.push({
            label: payload.data[i].checkName,
            ...graphStyle(i),
            data: [payload.data[i].responseMS],
          });
        }
      }
      return {
        ...state,
        currentGraph: {
          ...state.currentGraph,
          labels: [
            ...newLabels,
            payload.label,
          ],
          datasets: newDataSets,
        },
      };
    }
    case DEVICE_SUCCESS: {
      const deviceList = state.deviceList.concat(payload);
      return { ...state, deviceList };
    }
    default: {
      return state;
    }
  }
}
