import graphStyle from '../deviceStyle';

export const RECEIVEDCHECK = 'device/RECEIVEDCHECK';

// --------- ACTION CREATORS ----------
// export function receviedResponseTime(payload) {
//
// }

// ------- REDUCER --------
const initialState = {
  currentDevice: {
    id: 1,
    name: 'Device 1',
    description: 'This is a summary description',
    host: 'http://www.chris.com',
  },
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
    default: {
      return state;
    }
  }
}
