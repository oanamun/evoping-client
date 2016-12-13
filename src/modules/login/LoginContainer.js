import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { login } from './loginStore';

const propTypes = {
  error: PropTypes.bool.isRequired,
  redirectToHome: PropTypes.bool.isRequired,
  dispatchLogin: PropTypes.func.isRequired,
};

const defaultProps = {
  error: false,
  redirectToHome: false,
  dispatchLogin: () => {},
};

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: { email: '', password: '' },
    };

    this.onUpdateField = this.onUpdateField.bind(this);
    this.login = this.login.bind(this);
  }

  onUpdateField(event) {
    const { name, value } = event.currentTarget;
    const credentials = this.state.credentials;
    credentials[name] = value;
    this.setState({ credentials });
  }

  login() {
    this.props.dispatchLogin(this.state.credentials);
  }

  render() {
    if (this.props.redirectToHome) {
      return <Redirect to={'/'} />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input onChange={this.onUpdateField} type="email" name="email" id="email" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input onChange={this.onUpdateField} type="password" name="password" id="password" />
              </FormGroup>
              {this.props.error ? <p className="text-danger">User or password are incorrect</p> : ''}
              <Button type="button" onClick={this.login} outline color="primary">
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.loginStore.error,
  redirectToHome: state.loginStore.redirectToHome,
});

const mapDispatchToProps = {
  dispatchLogin: login,
};

LoginContainer.propTypes = propTypes;
LoginContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

