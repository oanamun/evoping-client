import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ListGroup, Alert } from 'reactstrap';
import ProjectListItem from 'modules/project/components/ProjectListItem';
import AddProjectForm from 'modules/project/components/AddProjectForm';
import { getProjects, addProject } from './stores/projectsStore';

const propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  location: PropTypes.object,
  projects: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  dispatchGetProjects: PropTypes.func,
  dispatchAddProject: PropTypes.func,
};

const defaultProps = {
  loggedInUser: {},
  projects: [],
  error: '',
  dispatchGetProjects: () => {},
  dispatchAddProject: () => {},
};

class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProject: { name: '' },
      error: this.props.error,
    };
    this.addProject = this.addProject.bind(this);
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
  }

  componentWillMount() {
    if (this.props.loggedInUser.email) {
      this.props.dispatchGetProjects();
    }
  }

  onFieldUpdate(event) {
    this.setState({
      newProject: {
        ...this.state.newProject,
        name: event.currentTarget.value,
      },
    });
  }

  addProject() {
    this.props.dispatchAddProject(this.state.newProject);
  }

  render() {
    const { loggedInUser, error } = this.props;
    if (!loggedInUser.email) {
      return <Redirect to={'/login'} />;
    }
    return (
      <div>
        <AddProjectForm
          onCreate={this.addProject}
          onFieldUpdate={this.onFieldUpdate}
        />

        <Alert
          color="danger"
          isOpen={error.length !== 0}
        >
          {error}
        </Alert>

        <ListGroup>
          {this.props.projects.map((project, index) =>
            <ProjectListItem
              project={project}
              selectedId={this.props.location.query ?
                parseInt(this.props.location.query.id, 10) : 0}
              key={project.id}
            />
          )}
        </ListGroup>
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
  dispatchAddProject: addProject,
};

ProjectsContainer.propTypes = propTypes;
ProjectsContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);

