import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class LoginContainer extends Component { // eslint-disable-line
  login() {
    console.log('login');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" />
              </FormGroup>
              <Button onClick={this.login} outline color="primary">
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginContainer;
