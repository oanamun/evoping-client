import React, { Component } from 'react';
import DeviceDetails from './components/DeviceDetails';
import DeviceGraph from './components/DeviceGraph';

const currentDevice = {
  id: 1,
  name: 'Device1',
  description: 'This is a summary description',
  host: 'http://www.chris.com',
};

const currentGraph = [{
  id: 1,
  name: 'Check 1',
}, {
  id: 2,
  name: 'Check 2',
}, {
  id: 3,
  name: 'Check 3',
}, {
  id: 4,
  name: 'Check 4',
}];

class DeviceContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <DeviceDetails currentDevice={currentDevice} />
        <DeviceGraph currentGraph={currentGraph} />
      </div>
    );
  }
}

export default DeviceContainer;
