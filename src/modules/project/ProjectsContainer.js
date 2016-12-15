import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';
import ProjectListItem from 'modules/project/components/ProjectListItem';
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
    this.state = {
      newProject: {
        id: 0,
        name: '',
        members: 0,
        devices: 0,
      },
    };
    this.addProject = this.addProject.bind(this);
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

  render() {
    return (
      <div>
        <AddProjectForm
          onCreate={this.addProject}
          onFieldUpdate={this.onFieldUpdate}
        />
        <ListGroup>
          {this.props.projects.map((project, index) =>
            <ProjectListItem
              project={project}
              key={project.id}
            />
          )}
        </ListGroup>
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

