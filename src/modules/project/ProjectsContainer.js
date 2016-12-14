import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProjectList from 'modules/project/components/ProjectList';
import AddProjectForm from 'modules/project/components/AddProjectForm';
import { getProjects, addProject, editProject, deleteProject } from './stores/projectsStore';

const propTypes = {
  projects: PropTypes.array.isRequired,
  dispatchGetProjects: PropTypes.func,
  dispatchAddProject: PropTypes.func,
  dispatchEditProject: PropTypes.func,
  dispatchDeleteProject: PropTypes.func,
};

const defaultProps = {
  projects: [],
  dispatchGetProjects: () => {},
  dispatchAddProject: () => {},
  dispatchEditProject: () => {},
  dispatchDeleteProject: () => {},
};

class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProject: {
        id: 0,
        name: '',
        members: 0,
        devices: 0,
      },
    };
    this.addProject = this.addProject.bind(this);
    this.editProject = this.editProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
  }

  componentWillMount() {
    this.props.dispatchGetProjects();
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

  editProject() {
    console.log('edit');
    this.props.dispatchEditProject(this.state.newProject);
  }

  deleteProject(event) {
    this.props.dispatchDeleteProject({ id: event.currentTarget.id });
  }

  render() {
    return (
      <div>
        <AddProjectForm
          onCreate={this.addProject}
          onFieldUpdate={this.onFieldUpdate}
        />
        <ProjectList
          projects={this.props.projects}
          onDelete={this.deleteProject}
          onEdit={this.editProject}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projectsStore.projects,
});

const mapDispatchToProps = {
  dispatchGetProjects: getProjects,
  dispatchAddProject: addProject,
  dispatchEditProject: editProject,
  dispatchDeleteProject: deleteProject,
};

ProjectsContainer.propTypes = propTypes;
ProjectsContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);

