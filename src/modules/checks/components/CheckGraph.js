import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs-2';

const propTypes = {
  graph: PropTypes.object.isRequired,
};

export const defaultProps = {
  graph: {},
};

function CheckGraph({ graph }) {
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

CheckGraph.propTypes = propTypes;
CheckGraph.defaultProps = defaultProps;

export default CheckGraph;
