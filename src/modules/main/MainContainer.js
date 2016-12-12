import React, { PropTypes, Component } from 'react';
import { Match, Redirect, Miss } from 'react-router';
import { UsersContainer } from 'modules/users';
import HeaderContainer from 'modules/header/HeaderContainer';
import LoginContainer from 'modules/login/LoginContainer';
import DashboardContainer from 'modules/dashboard/DashboardContainer';
import DeviceContainer from 'modules/device/DeviceContainer';

const propTypes = {
  pathname: PropTypes.string,
};

class MainContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <HeaderContainer />
        <Match pattern={`${this.props.pathname}`} exactly component={DashboardContainer} />
        <Match pattern={`${this.props.pathname}users`} component={UsersContainer} />
        <Match pattern={`${this.props.pathname}login`} component={LoginContainer} />
        <Match pattern={`${this.props.pathname}device/1`} component={DeviceContainer} />
        <Miss render={() => (<Redirect to="/" />)} />
      </div>
    );
  }
}

MainContainer.propTypes = propTypes;

export default MainContainer;
