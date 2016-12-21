import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { CardColumns, Alert } from 'reactstrap';
import ProjectCard from './components/ProjectCard';
import { getProjects } from '../project/stores/projectsStore';

const propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  dispatchGetProjects: PropTypes.func,
};

const defaultProps = {
  loggedInUser: {},
  projects: [],
  error: '',
  dispatchGetProjects: () => {},
};

class DashboardContainer extends Component { // eslint-disable-line
  componentWillMount() {
    if (this.props.loggedInUser.email) {
      this.props.dispatchGetProjects();
    }
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
};


DashboardContainer.propTypes = propTypes;
DashboardContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

