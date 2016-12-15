import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DeviceDetails from './components/DeviceDetails';
import DeviceGraph from './components/DeviceGraph';
import AddDeviceContainer from './add-device/AddDeviceContainer';

const propTypes = {
  graph: PropTypes.object.isRequired,
  device: PropTypes.object.isRequired,
};

const defaultProps = {
  graph: {},
  device: {},
};

class DeviceContainer extends Component { // eslint-disable-line
  render() {
    const { graph, device } = this.props;
    return (
      <div>
        <DeviceDetails device={device} />
        <DeviceGraph graph={graph} />
      </div>
    );
  }
}

DeviceContainer.propTypes = propTypes;
DeviceContainer.defaultProps = defaultProps;

function findById(devices, id) {
  return devices.find((item) => item.id === parseInt(id, 10));
}

const mapStateToProps = (state, ownProps) => ({
  device: findById(state.deviceStore.devices, ownProps.params.id),
  graph: state.deviceStore.currentGraph,
});

export default connect(mapStateToProps)(DeviceContainer);
