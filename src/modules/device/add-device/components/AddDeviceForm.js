import React, { PropTypes } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
  projectsList: PropTypes.array,
  currentProject: PropTypes.object,
};
const defaultProps = {
  handleSubmit: () => {},
  updateField: () => {},
  projectsList: [{ label: 1, value: 'val1' }, { label: 2, value: 'val2' }],
  currentProject: { label: 2, value: 'val2' },
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
      <FormGroup>
        <Select
          className="members-select"
          name="currentProject"
          currentProject={params.currentProject}
          options={params.projectsList}
          onChange={(option) => {
            params.onUpdateField({ currentTarget: {
              name: 'currentProject',
              value: option },
            });
          }}
          value={params.currentProject}
          placeholder={'Select project'}
        />
      </FormGroup>
      <Button outline color="primary">Save</Button>
    </Form>
  );
}

AddDeviceForm.PropTypes = propTypes;
AddDeviceForm.defaultProps = defaultProps;

export default AddDeviceForm;

