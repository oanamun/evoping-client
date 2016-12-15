import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addDevice } from './../stores/deviceStore';
import AddDeviceForm from './components/AddDeviceForm';

const propTypes = {
  dispatchAddDevice: PropTypes.func,
};
const defaultProps = {
  dispatchAddDevice: () => {},
};

class AddDeviceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceInfo: {
        name: '',
        description: '',
        isPublic: false,
        currentProject: { label: 2, value: 'val2' },
      },
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
    return (
      <AddDeviceForm
        handleSubmit={this.handleSave}
        onUpdateField={this.updateField}
        currentProject={this.state.deviceInfo.currentProject}
      />
    );
  }
}
const mapDispatchToProps = {
  dispatchAddDevice: addDevice,
};

AddDeviceContainer.propTypes = propTypes;
AddDeviceContainer.defaultProps = defaultProps;

export default connect(null, mapDispatchToProps)(AddDeviceContainer);

