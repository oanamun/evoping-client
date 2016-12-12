import React, { Component } from 'react';
import { Link } from 'react-router';

class HeaderContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/users">Users Page</Link>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default HeaderContainer;
