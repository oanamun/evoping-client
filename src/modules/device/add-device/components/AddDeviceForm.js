import React, { PropTypes } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';

const propTypes = {
  projects: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  onUpdateField: PropTypes.func.isRequired,
};
const defaultProps = {
  projects: [],
  handleSubmit: () => {},
  onUpdateField: () => {},
};

function AddDeviceForm({ handleSubmit, onUpdateField, projects }) {
  const projectsList = projects.map((project) => {
    return { label: project.name, value: project }
  });
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
          currentProject={projectsList[0]}
          options={projectsList}
          onChange={(option) => {
            onUpdateField({ currentTarget: {
              name: 'currentProject',
              value: option },
            });
          }}
          value={projectsList[0]}
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

