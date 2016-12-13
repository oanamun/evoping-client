import React, { PropTypes } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

const propTypes = {
  onCreate: PropTypes.func.isRequired,
  onFieldUpdate: PropTypes.func.isRequired,
};

const defaultProps = {
  onCreate: () => {},
  onFieldUpdate: () => {},
};

function AddProjectForm({ onCreate, onFieldUpdate }) {
  return (
    <Form inline className="mb-2">
      <FormGroup>
        <Input
          type="text"
          name="project"
          autoComplete="off"
          placeholder="Project Name"
          onChange={onFieldUpdate}
        />
      </FormGroup>
      <Button
        className="ml-1"
        outline
        color="primary"
        type="button"
        onClick={onCreate}
      >
        Add Project
      </Button>
    </Form>
  );
}

AddProjectForm.propTypes = propTypes;
AddProjectForm.defaultProps = defaultProps;

export default AddProjectForm;
