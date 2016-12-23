import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router';

const propTypes = {
  project: PropTypes.object.isRequired,
  check: PropTypes.object.isRequired,
};

const defaultProps = {
  project: {},
  check: { check: { date: '', responseTime: '' } },
};

function ProjectCard({ project, check }) {
  let status;
  if (check.check.responseTime === '') {
    status = (<span className="tag tag-default tag-pill float-xs-right">
              not checked
            </span>);
  } else if (check.check.responseTime === false) {
    status = (<span className="tag tag-danger tag-pill float-xs-right">
              down
            </span>);
  } else {
    status = (<span className="tag tag-success tag-pill float-xs-right">
              up
            </span>);
  }

  return (
    <Card block className="project-card">
      <CardTitle>
        <Link
          to={`/project/${project.id}`}
        >
          {project.name}
        </Link>
        {status}
      </CardTitle>
      {project.Check.length === 1 ?
        <CardText className="font-weight-bold">{project.Check.length} check</CardText> :
        <CardText className="font-weight-bold">{project.Check.length} checks</CardText>
      }
      <CardText>Last check: {check.check.date || '-'}</CardText>
      <CardText>Last response time: {check.check.responseTime || '-'} ms</CardText>
    </Card>
  );
}

ProjectCard.propTypes = propTypes;
ProjectCard.defaultProps = defaultProps;

export default ProjectCard;
