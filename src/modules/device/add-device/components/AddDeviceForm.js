import React, { PropTypes } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onUpdateField: PropTypes.func.isRequired,
  projectsList: PropTypes.array,
  currentProject: PropTypes.object,
};
const defaultProps = {
  handleSubmit: () => {},
  onUpdateField: () => {},
  projectsList: [{ label: 1, value: 'val1' }, { label: 2, value: 'val2' }],
  currentProject: { label: 2, value: 'val2' },
};

function AddDeviceForm({ handleSubmit, onUpdateField, currentProject, projectsList }) {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup >
        <Label for="deviceName">Device name</Label>
        <Input onChange={onUpdateField} type="text" name="name" id="deviceName" required placeholder="enter device name" />
      </FormGroup>
      <FormGroup>
        <Label for="deviceDescription">Device description</Label>
        <Input onChange={onUpdateField} type="text" name="description" id="deviceDescription" placeholder="enter device description" />
      </FormGroup>
      <FormGroup>
        <Label for="public">Public</Label>
        <Input onChange={onUpdateField} type="select" name="selectPublic" id="public">
          <option>No</option>
          <option>Yes</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="selectProject">Select Project</Label>
        <Select
          id="selectProject"
          name="currentProject"
          currentProject={currentProject}
          options={projectsList}
          onChange={(option) => {
            onUpdateField({ currentTarget: {
              name: 'currentProject',
              value: option },
            });
          }}
          value={currentProject}
          placeholder={'Select project'}
        />
      </FormGroup>
      <Button outline color="primary">Save</Button>
    </Form>
  );
}

AddDeviceForm.propTypes = propTypes;
AddDeviceForm.defaultProps = defaultProps;

export default AddDeviceForm;

