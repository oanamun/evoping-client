import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProjectList from 'modules/project/components/ProjectList';
import AddProjectForm from 'modules/project/components/AddProjectForm';
import { getProjects, addProject } from './stores/projectsStore';

const propTypes = {
  projects: PropTypes.array.isRequired,
  dispatchGetProjects: PropTypes.func,
  dispatchAddProject: PropTypes.func,
};

const defaultProps = {
  projects: [],
  dispatchGetProjects: () => {},
  dispatchAddProject: () => {},
};

class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { newProject: '' };
    this.addProject = this.addProject.bind(this);
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
  }

  componentWillMount() {
    this.props.dispatchGetProjects();
  }

  onFieldUpdate(event) {
    this.setState({ newProject: event.currentTarget.value });
  }

  addProject() {
    this.props.dispatchAddProject({
      id: 3,
      name: this.state.newProject,
      members: 0,
      devices: 0,
    });
  }

  render() {
    return (
      <div>
        <AddProjectForm onCreate={this.addProject} onFieldUpdate={this.onFieldUpdate} />
        <ProjectList projects={this.props.projects} />
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
};

ProjectsContainer.propTypes = propTypes;
ProjectsContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);

