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
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
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
      backgroundColor: 'red',
      borderColor: 'red',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'red',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'red',
      pointHoverBorderColor: 'red',
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
      backgroundColor: 'yellow',
      borderColor: 'yellow',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'yellow',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'yellow',
      pointHoverBorderColor: 'yellow',
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
      backgroundColor: 'blue',
      borderColor: 'blue',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'blue',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'blue',
      pointHoverBorderColor: 'blue',
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
            maintainAspectRatio: false,
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
