import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs-2';

const propTypes = {
  currentGraph: PropTypes.array.isRequired,
};

export const defaultProps = {
  currentGraph: [],
};

const data = {
  labels: ['12:50:00', '12:50:05', '12:50:10', '12:50:15', '12:50:20', '12:50:25', '12:50:30'],
  datasets: [
    {
      label: 'Check 1',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#66b92e',
      borderColor: '#66b92e',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#66b92e',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#66b92e',
      pointHoverBorderColor: '#66b92e',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, Math.floor(Math.random() * 99) + 1],
      spanGaps: false,
    },
    {
      label: 'Check 2',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#d65b4a',
      borderColor: '#d65b4a',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#d65b4a',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#d65b4a',
      pointHoverBorderColor: '#d65b4a',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [75, 50, 30, 21, 26, 85, 95],
      spanGaps: false,
    },
    {
      label: 'Check 3',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#da932c',
      borderColor: '#da932c',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#da932c',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#da932c',
      pointHoverBorderColor: '#da932c',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [55, 19, 20, 31, 86, 25, 60],
      spanGaps: false,
    },
    {
      label: 'Check 4',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#2499f2',
      borderColor: '#2499f2',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#2499f2',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#2499f2',
      pointHoverBorderColor: '#2499f2',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [15, 29, 30, 21, 16, 25, 40],
      spanGaps: false,
    },
  ],
};

const renderCheck = (checks) =>
  (checks.map((check) =>
    <li key={check.id}>
      <p>Name: {check.name}</p>
    </li>
  ));

function DeviceGraph({ currentGraph }) {
  return (
    <div>
      <ul>
        {renderCheck(currentGraph)}
      </ul>
      <div>
        <Line
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </div>
    </div>
  )
    ;
}

DeviceGraph.propTypes = propTypes;
DeviceGraph.defaultProps = defaultProps;

export default DeviceGraph;
