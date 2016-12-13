import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs-2';

const propTypes = {
  currentGraph: PropTypes.object.isRequired,
};

export const defaultProps = {
  currentGraph: {},
};

// const renderCheck = (checks) =>
//   (checks.map((check) =>
//     <li key={check.id}>
//       <p>Name: {check.name}</p>
//     </li>
//   ));

function DeviceGraph({ currentGraph }) {
  return (
    <div>
      <div>
        <Line
          data={currentGraph}
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
