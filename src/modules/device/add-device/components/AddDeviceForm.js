import React, { PropTypes } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
};
const defaultProps = {
  handleSubmit: () => {},
  updateField: () => {},
};

function AddDeviceForm(params) {
  return (
    <Form onSubmit={params.handleSubmit}>
      <FormGroup >
        <Label for="deviceName">Device name</Label>
        <Input onChange={params.onUpdateField} type="text" name="name" id="deviceName" required placeholder="enter device name" />
      </FormGroup>
      <FormGroup>
        <Label for="deviceDescription">Device description</Label>
        <Input onChange={params.onUpdateField} type="text" name="description" id="deviceDescription" placeholder="enter device description" />
      </FormGroup>
      <FormGroup>
        <Label for="public">Public</Label>
        <Input onChange={params.onUpdateField} type="select" name="selectPublic" id="public">
          <option>No</option>
          <option>Yes</option>
        </Input>
      </FormGroup>
      <Button>Save</Button>
    </Form>
  );
}

AddDeviceForm.PropTypes = propTypes;
AddDeviceForm.defaultProps = defaultProps;

export default AddDeviceForm;

