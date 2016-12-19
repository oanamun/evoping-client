import React, { PropTypes } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';

const propTypes = {
  projects: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  onUpdateField: PropTypes.func.isRequired,
  currentProject: PropTypes.object,
};
const defaultProps = {
  projects: [],
  handleSubmit: () => {},
  onUpdateField: () => {},
  currentProject: null,
};

function AddCheckForm({ projects, handleSubmit, onUpdateField, currentProject }) {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup >
        <Label for="checkName">Check name</Label>
        <Input
          onChange={onUpdateField} type="text" name="name" id="checkName"
          required placeholder="enter check name"
        />
      </FormGroup>
      <FormGroup>
        <Label for="checkInterval">Check interval in seconds</Label>
        <Input
          onChange={onUpdateField} type="text" name="interval" id="checkInterval"
          placeholder="enter check interval"
        />
      </FormGroup>
      <FormGroup>
        <Label for="selectProject">Select Project</Label>
        <Select
          required
          id="selectProject"
          name="currentProject"
          options={projects}
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
      <Button outline color="primary">Add check</Button>
    </Form>
  );
}

AddCheckForm.propTypes = propTypes;
AddCheckForm.defaultProps = defaultProps;

export default AddCheckForm;

