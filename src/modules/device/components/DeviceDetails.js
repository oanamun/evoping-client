import React, { PropTypes } from 'react';

const propTypes = {
  currentDevice: PropTypes.object.isRequired,
};

export const defaultProps = {
  currentDevice: {
    name: 'Default Device name',
  },
};

function DeviceDetails({ currentDevice }) {
  return (
    <div>
      <p>
        Name : {currentDevice.name}
      </p>
      <p>
        Description: {currentDevice.description}
      </p>
      <p>
        Host: {currentDevice.host}
      </p>
    </div>
  );
}

DeviceDetails.propTypes = propTypes;
DeviceDetails.defaultProps = defaultProps;

export default DeviceDetails;
