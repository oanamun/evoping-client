import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DeviceDetails from './components/DeviceDetails';
import DeviceGraph from './components/DeviceGraph';
import AddDeviceContainer from './add-device/AddDeviceContainer';

const propTypes = {
  currentGraph: PropTypes.object.isRequired,
  currentDevice: PropTypes.object.isRequired,
};

const defaultProps = {
  currentGraph: {},
  currentDevice: {},
};

class DeviceContainer extends Component { // eslint-disable-line
  render() {
    const { currentGraph, currentDevice } = this.props;
    return (
      <div>
        <AddDeviceContainer />
        <DeviceDetails currentDevice={currentDevice} />
        <DeviceGraph currentGraph={currentGraph} />
      </div>
    );
  }
}

DeviceContainer.propTypes = propTypes;
DeviceContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  currentGraph: state.device.currentGraph,
  currentDevice: state.device.currentDevice,
});

export default connect(mapStateToProps)(DeviceContainer);
