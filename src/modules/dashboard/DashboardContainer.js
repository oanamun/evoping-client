import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { CardColumns, Alert } from 'reactstrap';
import ProjectCard from './components/ProjectCard';
import { getProjects, readData, disconnectChanel } from '../project/stores/projectsStore';

const propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  dispatchGetProjects: PropTypes.func,
  dispatchReadData: PropTypes.func,
  dispatchDisconnectChanel: PropTypes.func,
};

const defaultProps = {
  loggedInUser: {},
  projects: [],
  error: '',
  dispatchGetProjects: () => {},
  dispatchReadData: () => {},
  dispatchDisconnectChanel: () => {},
};

class DashboardContainer extends Component { // eslint-disable-line
  componentWillMount() {
    const { loggedInUser } = this.props;
    if (loggedInUser.email) {
      this.props.dispatchGetProjects((projects) => {
        projects.map((project) => this.props.dispatchReadData(project.id));
      });
    }
  }

  componentWillUnmount() {
    console.log('unmount');
    this.props.projects.map((project) =>
      this.props.dispatchDisconnectChanel(project.id));
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

const mapStateToProps = (state) => ({
  loggedInUser: state.loginStore.loggedInUser,
  projects: state.projectsStore.projects,
  error: state.projectsStore.error,
});

const mapDispatchToProps = {
  dispatchGetProjects: getProjects,
  dispatchReadData: readData,
  dispatchDisconnectChanel: disconnectChanel,
};


DashboardContainer.propTypes = propTypes;
DashboardContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

