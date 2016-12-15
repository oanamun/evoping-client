import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import DevicesTableRow from './components/DevicesTableRow';

const propTypes = {
  devices: PropTypes.array.isRequired,
};

const defaultProps = {
  devices: [],
};

class DashboardContainer extends Component { // eslint-disable-line
  render() {
    const { devices } = this.props;
    return (
      <Table inverse responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Device name</th>
            <th>Project</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <DevicesTableRow
              key={index}
              index={index}
              device={device}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

function getDevicesWithProject(devices, projects) {
  return devices.map((device) => {
    const deviceProject = projects.find((project) => project.id === device.project_id);
    return { ...device, project: deviceProject.name };
  });
}

const mapStateToProps = (state) => ({
  devices: getDevicesWithProject(state.deviceStore.devices, state.projectsStore.projects),
});

DashboardContainer.propTypes = propTypes;
DashboardContainer.defaultProps = defaultProps;

export default connect(mapStateToProps)(DashboardContainer);

