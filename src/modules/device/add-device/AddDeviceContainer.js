import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { addDevice } from './../stores/deviceStore';
import AddDeviceForm from './components/AddDeviceForm';

const propTypes = {
  projects: PropTypes.array,
  dispatchAddDevice: PropTypes.func,
  redirectToHome: PropTypes.bool,
};
const defaultProps = {
  projects: [],
  dispatchAddDevice: () => {},
  redirectToHome: false,
};

class AddDeviceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceInfo: {
        name: '',
        description: '',
        isPublic: false,
        currentProject: this.props.projects[0],
      },
      redirectToHome: false,
    };
    this.handleSave = this.handleSave.bind(this);
    this.updateField = this.updateField.bind(this);
  }
  handleSave(evt) {
    evt.preventDefault();
    this.props.dispatchAddDevice(this.state.deviceInfo);
  }
  updateField(evt) {
    const { name, value } = evt.currentTarget;
    const device = this.state.deviceInfo;
    if (name === 'selectPublic') {
      device.isPublic = value === 'Yes' ? 1 : 0;
    } else {
      device[name] = value;
    }
    this.setState({ deviceInfo: device });
  }
  render() {
    if (this.props.redirectToHome) {
      return <Redirect to={'/'} />;
    }
    return (
      <AddDeviceForm
        projects={this.props.projects}
        handleSubmit={this.handleSave}
        onUpdateField={this.updateField}
        currentProject={this.state.deviceInfo.currentProject}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  projects: state.projectsStore.projects.map((project) =>
  ({ label: project.name, value: project.id })),
  redirectToHome: state.deviceStore.redirectToHome,

});

const mapDispatchToProps = {
  dispatchAddDevice: addDevice,
};

AddDeviceContainer.propTypes = propTypes;
AddDeviceContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceContainer);

