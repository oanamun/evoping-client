import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router';

const propTypes = {
  project: PropTypes.object.isRequired,
};

const defaultProps = {
  project: {},
};

function ProjectCard({ project }) {
  return (
    <Card block className="project-card">
      <CardTitle>
        <Link
          to={`/project/${project.id}`}
        >
          {project.name}
        </Link>
        {project.status ?
          <span className="tag tag-success tag-pill float-xs-right">
            up
          </span> :
          <span className="tag tag-danger tag-pill float-xs-right">
            down
          </span>}
      </CardTitle>
      <CardText>{project.checks} checks</CardText>
      <CardText>Last check: {project.last_check}</CardText>
      <CardText>Last response time: {project.response_time}</CardText>

    </Card>
  );
}

ProjectCard.propTypes = propTypes;
ProjectCard.defaultProps = defaultProps;

export default ProjectCard;
