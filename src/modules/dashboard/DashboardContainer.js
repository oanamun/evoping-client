import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CardColumns } from 'reactstrap';
import ProjectCard from './components/ProjectCard';
import { getProjects } from '../project/stores/projectsStore';

const propTypes = {
  projects: PropTypes.array.isRequired,
  dispatchGetProjects: PropTypes.func,
};

const defaultProps = {
  projects: [],
  dispatchGetProjects: () => {},
};

class DashboardContainer extends Component { // eslint-disable-line
  componentWillMount() {
    this.props.dispatchGetProjects();
  }

  render() {
    const { projects } = this.props;
    return (
      <CardColumns>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
          />
        ))}
      </CardColumns>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projectsStore.projects,
});

const mapDispatchToProps = {
  dispatchGetProjects: getProjects,
};


DashboardContainer.propTypes = propTypes;
DashboardContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

