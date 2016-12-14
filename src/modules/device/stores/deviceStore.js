import graphStyle from '../deviceStyle';

export const RECEIVEDCHECK = 'device/RECEIVEDCHECK';

// --------- ACTION CREATORS ----------
// export function receviedResponseTime(payload) {
//
// }

// ------- REDUCER --------
const initialState = {
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
