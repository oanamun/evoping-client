import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DeviceDetails from './components/DeviceDetails';
import DeviceGraph from './components/DeviceGraph';
import { loadGraph, disconnectChanel } from './stores/deviceStore';

const propTypes = {
  graph: PropTypes.object.isRequired,
  device: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  dispatchLoadGraph: PropTypes.func.isRequired,
  dispatchDisconnectChanel: PropTypes.func.isRequired,
};

const defaultProps = {
  graph: {},
  device: {},
  dispatchLoadGraph: () => {
  },
  dispatchDisconnectChanel: () => {
  },
};

class DeviceContainer extends Component { // eslint-disable-line

  componentWillMount() {
    console.log(`mount ${this.props.params.id}`);
    this.props.dispatchLoadGraph(this.props.params.id);
  }

  componentWillUnmount() {
    console.log('unmount');
    this.props.dispatchDisconnectChanel();
  }

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

const mapDispatchToProps = {
  dispatchLoadGraph: loadGraph,
  dispatchDisconnectChanel: disconnectChanel,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceContainer);
