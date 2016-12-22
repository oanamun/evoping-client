import React, { PropTypes, Component } from 'react';
import { Match, Redirect, Miss } from 'react-router';
import { connect } from 'react-redux';
import HeaderContainer from 'modules/header/HeaderContainer';
import LoginContainer from 'modules/login/LoginContainer';
import DashboardContainer from 'modules/dashboard/DashboardContainer';
import ProjectsContainer from 'modules/project/ProjectsContainer';
import AddCheckContainer from 'modules/checks/add-check/AddCheckContainer';
import CheckContainer from 'modules/checks/CheckContainer';
import ProjectInfoTable from '../project/components/ProjectInfoTable';

const propTypes = {
  pathname: PropTypes.string,
};

class MainContainer extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <div className="container">
          <div className="row">
            <div className="col-xs">
              <Match
                pattern={''}
                exactly
                component={DashboardContainer}
              />
              <Match
                exactly
                pattern={'/project'}
                component={ProjectsContainer}
              />
              <Match
                exactly
                pattern={'/project/:projectId'}
                component={ProjectInfoTable}
              />
              <Match
                pattern={'/project/:projectId/check/:checkId'}
                component={CheckContainer}
              />
              <Match
                pattern={`${this.props.pathname}login`}
                component={LoginContainer}
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
