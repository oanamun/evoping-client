import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { UsersContainer } from 'modules/users';

class HeaderContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/users">Users Page</Link>
      </div>
    );
  }
}

export default HeaderContainer;
