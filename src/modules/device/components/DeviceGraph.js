import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs-2';

const propTypes = {
  graph: PropTypes.object.isRequired,
};

export const defaultProps = {
  graph: {},
};

// const renderCheck = (checks) =>
//   (checks.map((check) =>
//     <li key={check.id}>
//       <p>Name: {check.name}</p>
//     </li>
//   ));

function DeviceGraph({ graph }) {
  return (
    <div>
      <div>
        <Line
          data={graph}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </div>
    </div>
  );
}

DeviceGraph.propTypes = propTypes;
DeviceGraph.defaultProps = defaultProps;

export default DeviceGraph;
