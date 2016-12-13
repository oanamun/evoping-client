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

const mapStateToProps = (state) => ({
  devices: [
    { id: 1, name: 'Evo live', project: 'Evotalks', status: 0 },
    { id: 2, name: 'Evo staging', project: 'Evotalks', status: 1 },
    { id: 3, name: 'SIIT live', project: 'SIIT', status: 1 },
    { id: 4, name: 'Un doi', project: '12', status: 1 },
  ],
});

DashboardContainer.propTypes = propTypes;
DashboardContainer.defaultProps = defaultProps;

export default connect(mapStateToProps)(DashboardContainer);

