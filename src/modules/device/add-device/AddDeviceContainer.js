import React, { Component } from 'react';
import AddDeviceForm from './components/AddDeviceForm';

class AddDeviceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceInfo: {
        name: '',
        description: '',
        public: false,
      },
    };
    this.handleSave = this.handleSave.bind(this);
    this.updateField = this.updateField.bind(this);
  }
  handleSave(evt) {
    evt.preventDefault();
  }
  updateField(evt) {
    console.log(evt.currentTarget.value, evt.currentTarget.name);
    const { name, value } = evt.currentTarget;
    const device = this.state.deviceInfo;
    if (name === 'selectPublic') {
      device.public = value === 'Yes' ? 1 : 0;
    } else {
      device[name] = value;
    }
    this.setState({ deviceInfo: device });
  }
  render() {
    return (
      <AddDeviceForm handleSubmit={this.handleSave} onUpdateField={this.updateField} />
    );
  }
}

export default AddDeviceContainer;

