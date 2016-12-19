import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CardColumns } from 'reactstrap';
import ProjectCard from './components/ProjectCard';

const propTypes = {
  projects: PropTypes.array.isRequired,
};

const defaultProps = {
  projects: [],
};

class DashboardContainer extends Component { // eslint-disable-line

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

DashboardContainer.propTypes = propTypes;
DashboardContainer.defaultProps = defaultProps;

export default connect(mapStateToProps)(DashboardContainer);

