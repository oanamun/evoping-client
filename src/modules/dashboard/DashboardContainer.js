import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { CardColumns, Alert } from 'reactstrap';
import ProjectCard from './components/ProjectCard';
import {
  getProjects,
  readData,
  disconnectChanel,
  getLastCheck,
} from '../project/stores/projectsStore';
import { socketAuthenticate } from '../login/loginStore';

const propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  dispatchGetProjects: PropTypes.func,
  dispatchReadData: PropTypes.func,
  dispatchDisconnectChanel: PropTypes.func,
  dispatchSocketAuthenticate: PropTypes.func,
  dispatchGetLastCheck: PropTypes.func,
};

const defaultProps = {
  loggedInUser: {},
  projects: [],
  error: '',
  dispatchGetProjects: () => {
  },
  dispatchReadData: () => {
  },
  dispatchDisconnectChanel: () => {
  },
  dispatchSocketAuthenticate: () => {
  },
  dispatchGetLastCheck: () => {
  },
};

class DashboardContainer extends Component { // eslint-disable-line
  componentWillMount() {
    const { loggedInUser, dispatchSocketAuthenticate, dispatchGetProjects } = this.props;
    if (loggedInUser.email) {
      dispatchSocketAuthenticate(() => {
        dispatchGetProjects((projects) => {
          projects.map((project) => {
            this.props.dispatchGetLastCheck(project.id, (checks) => {
              getLastCheckProject(projects, checks);
            });
            this.props.dispatchReadData(project.id);
            return project;
          });
        });
      });
    }
  }

  componentWillUnmount() {
    console.log('unmount');
    this.props.projects.map((project) => {
      console.log(project);
      this.props.dispatchDisconnectChanel(project.id);
      return project;
    });
  }

  render() {
    const { projects, loggedInUser } = this.props;
    if (!loggedInUser.email) {
      return <Redirect to={'/login'} />;
    }
    return (
      <div>
        <Alert color="danger" isOpen={this.props.error.length !== 0}>
          {this.props.error}
        </Alert>
        <CardColumns>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
            />
          ))}
        </CardColumns>
      </div>
    );
  }
}

function getLastCheckProject(projects, checks) {
  projects.map((project) => {
    const check = checks.find((c) => {
      c.id === project.id
    });
    console.log(checks);
    return {
      ...project,
      check,
    };
  });

  return projects;
}

const mapStateToProps = (state) => ({
  loggedInUser: state.loginStore.loggedInUser,
  projects: state.projectsStore.projects,
  error: state.projectsStore.error,
  checks: state.projectsStore.lastChecks,
});

const mapDispatchToProps = {
  dispatchGetProjects: getProjects,
  dispatchReadData: readData,
  dispatchDisconnectChanel: disconnectChanel,
  dispatchSocketAuthenticate: socketAuthenticate,
  dispatchGetLastCheck: getLastCheck,
};


DashboardContainer.propTypes = propTypes;
DashboardContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

