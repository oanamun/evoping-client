import React, { PropTypes, Component } from 'react';
import { Match, Redirect, Miss } from 'react-router';
import { UsersContainer } from 'modules/users';
import { HeaderContainer } from 'modules/header';

const propTypes = {
  pathname: PropTypes.string,
};

class MainContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <HeaderContainer />
        <Match pattern={`${this.props.pathname}users`} component={UsersContainer} />
        <Miss render={() => (<Redirect to="/" />)} />
      </div>
    );
  }
}

MainContainer.propTypes = propTypes;

export default MainContainer;
