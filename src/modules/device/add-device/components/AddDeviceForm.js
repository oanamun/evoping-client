import React, { PropTypes } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
const defaultProps = {};

function AddDeviceForm(params) {
  return (
    <Form>
      <FormGroup>
        <Label for="deviceName">Device name</Label>
        <Input type="text" name="email" id="deviceName" required placeholder="enter device name" />
      </FormGroup>
      <FormGroup>
        <Label for="deviceDescription">Device description</Label>
        <Input type="text" name="description" id="deviceDescription" placeholder="enter device description" />
      </FormGroup>
      <FormGroup>
        <Label for="public">Public</Label>
        <Input type="select" name="selectPublic" id="public">
          <option>No</option>
          <option>Yes</option>
        </Input>
      </FormGroup>
      <Button onClick={params.handleSubmit}>Save</Button>
    </Form>
  );
}

AddDeviceForm.PropTypes = propTypes;
AddDeviceForm.defaultProps = defaultProps;

export default AddDeviceForm;

