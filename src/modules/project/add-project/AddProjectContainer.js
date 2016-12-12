import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddProjectContainer extends Component { // eslint-disable-line
  render() {
    return (
      <Form inline>
        <FormGroup>
          <Label for="projectName">Project Name</Label>{' '}
          <Input type="text" name="project" id="projectName" placeholder="Project Name" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}
export default AddProjectContainer;
