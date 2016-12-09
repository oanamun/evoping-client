import React, { PropTypes, Component } from 'react';
import { Match, Link, Redirect, Miss } from 'react-router';
import { UsersContainer } from 'modules/users';

const propTypes = {
  pathname: PropTypes.string,
};

class MainContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/users">Users Page</Link>
        </div>
        <Match pattern={`${this.props.pathname}users`} component={UsersContainer} />
        <Miss render={() => (<Redirect to="/" />)} />
      </div>
    );
  }
}

MainContainer.propTypes = propTypes;

export default MainContainer;
