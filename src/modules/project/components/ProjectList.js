import React, { PropTypes } from 'react';
import { ListGroup } from 'reactstrap';
import Project from 'modules/project/components/Project';

const propTypes = {
  projects: PropTypes.array,
};
const defaultProps = {
  projects: ['Evotalks', 'SIIT'],
};
function ProjectList({ projects }) {
  return (
    <ListGroup>
      {projects.map((elem, index) =>
        <Project info={elem} key={index} />
        )}
    </ListGroup>);
}

ProjectList.propTypes = propTypes;
ProjectList.defaultProps = defaultProps;

export default ProjectList;
