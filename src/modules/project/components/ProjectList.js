import React, { PropTypes } from 'react';
import { ListGroup } from 'reactstrap';
import ProjectListItem from 'modules/project/components/ProjectListItem';

const propTypes = {
  projects: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const defaultProps = {
  projects: [],
  onDelete: () => {},
  onEdit: () => {},
};

function ProjectList({ projects, onDelete, onEdit }) {
  return (
    <ListGroup>
      {projects.map((project, index) =>
        <ProjectListItem
          onDelete={onDelete}
          onEdit={onEdit}
          project={project}
          key={index}
        />
      )}
    </ListGroup>);
}

ProjectList.propTypes = propTypes;
ProjectList.defaultProps = defaultProps;

export default ProjectList;
