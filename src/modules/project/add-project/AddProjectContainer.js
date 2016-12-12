import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddProjectContainer extends Component { // eslint-disable-line
  render() {
    return (
      <Form inline className="mb-2">
        <FormGroup>
          <Input type="text" name="project" id="projectName" placeholder="Project Name" />
        </FormGroup>
        <Button className="ml-1" outline color="primary">Add</Button>
      </Form>
    );
  }
}
export default AddProjectContainer;
