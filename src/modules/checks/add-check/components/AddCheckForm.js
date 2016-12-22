import React, { PropTypes } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';

const propTypes = {
  projects: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  onUpdateField: PropTypes.func.isRequired,
  selectedProject: PropTypes.object,
};
const defaultProps = {
  projects: [],
  handleSubmit: () => {},
  onUpdateField: () => {},
  selectedProject: null,
};

function AddCheckForm({ projects, handleSubmit, onUpdateField, selectedProject }) {
  return (
    <Form>
      <FormGroup >
        <Label for="checkName">Check name</Label>
        <Input
          onChange={onUpdateField} type="text" name="name" id="checkName"
          required placeholder="Check 1"
        />
      </FormGroup>
      <FormGroup >
        <Label for="checkHost">Host</Label>
        <Input
          onChange={onUpdateField} type="text" name="host" id="checkHost"
          required placeholder="http://example.com/page"
        />
      </FormGroup>
      <FormGroup >
        <Label for="checkResponse">Maximum response time (seconds)</Label>
        <Input
          onChange={onUpdateField} type="text" name="max_response_time" id="checkResponse"
          required placeholder="5"
        />
      </FormGroup>
      <FormGroup>
        <Label for="checkInterval">Check interval (seconds)</Label>
        <Input
          onChange={onUpdateField} type="text" name="check_interval" id="checkInterval"
          placeholder="5"
        />
      </FormGroup>
      <FormGroup>
        <Label for="checkType">Type</Label>
        <Select
          required
          id="selectType"
          name="currentType"
          options={[{ label: 'web', value: 'web' }]}
          placeholder={'Select type'}
          value={{ label: 'web', value: 'web' }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="checkMethodType">Method Type</Label>
        <Select
          required
          id="selectMethod"
          name="currentMethod"
          options={[{ label: 'GET', value: 'GET' }]}
          placeholder={'Select method'}
          value={{ label: 'GET', value: 'GET' }}
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
            onUpdateField({ currentTarget: { name: 'selectedProject', value: option } });
          }}
          placeholder={'Select project'}
          value={selectedProject}
        />
      </FormGroup>
      <Button type="button" outline color="primary" onClick={handleSubmit}>Add check</Button>
    </Form>
  );
}

AddCheckForm.propTypes = propTypes;
AddCheckForm.defaultProps = defaultProps;

export default AddCheckForm;

