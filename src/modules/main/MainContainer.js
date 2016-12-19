import React, { PropTypes, Component } from 'react';
import { Match, Redirect, Miss } from 'react-router';
import HeaderContainer from 'modules/header/HeaderContainer';
import LoginContainer from 'modules/login/LoginContainer';
import DashboardContainer from 'modules/dashboard/DashboardContainer';
import ProjectsContainer from 'modules/project/ProjectsContainer';
import CheckContainer from 'modules/checks/CheckContainer';
import AddCheckContainer from 'modules/checks/add-check/AddCheckContainer';

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
                pattern={`${this.props.pathname}check/:id`}
                component={CheckContainer}
              />
              <Match
                pattern={`${this.props.pathname}add-check`}
                component={AddCheckContainer}
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
