import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class LoginContainer extends Component { // eslint-disable-line
  login() {
    console.log('login');
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" />
        </FormGroup>
        <Button onClick={this.login} outline color="primary">Login</Button>
      </Form>
    );
  }
}

export default LoginContainer;
