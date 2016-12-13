import React, { PropTypes, Component } from 'react';
import { Match, Redirect, Miss } from 'react-router';
import HeaderContainer from 'modules/header/HeaderContainer';
import LoginContainer from 'modules/login/LoginContainer';
import DashboardContainer from 'modules/dashboard/DashboardContainer';
import ProjectsContainer from 'modules/project/ProjectsContainer';
import DeviceContainer from 'modules/device/DeviceContainer';

const propTypes = {
  pathname: PropTypes.string,
};

class MainContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <HeaderContainer />
        <div className="container">
          <div className="row">
            <div className="col-xs">
              <Match
                pattern={`${this.props.pathname}`}
                exactly
                component={DashboardContainer}
              />
              <Match
                pattern={`${this.props.pathname}projects`}
                component={ProjectsContainer}
              />
              <Match
                pattern={`${this.props.pathname}login`}
                component={LoginContainer}
              />
              <Match
                pattern={`${this.props.pathname}device/1`}
                component={DeviceContainer}
              />
              <Miss render={() => (<Redirect to="/" />)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = propTypes;

export default MainContainer;
