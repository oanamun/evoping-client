import React, { PropTypes } from 'react';
import { ListGroup } from 'reactstrap';
import ProjectListItem from 'modules/project/components/ProjectListItem';

const propTypes = {
  projects: PropTypes.array,
};

const defaultProps = {
  projects: [],
};

function ProjectList({ projects }) {
  return (
    <ListGroup>
      {projects.map((project, index) =>
        <ProjectListItem project={project} key={index} />
        )}
    </ListGroup>);
}

ProjectList.propTypes = propTypes;
ProjectList.defaultProps = defaultProps;

export default ProjectList;
