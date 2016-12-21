import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Row, Col, Tag, Button } from 'reactstrap';

const propTypes = {
  members: PropTypes.array,
  checks: PropTypes.array,
  onRemoveMember: PropTypes.func.isRequired,
};

const defaultProps = {
  members: [],
  checks: [],
  onRemoveMember: () => {},
};

function ProjectInfoTable({ members, checks, onRemoveMember }) {
  return (
    <Row>
      <Col md="6">
        <ListGroup>
          <ListGroupItem active action>
            checks
          </ListGroupItem>
          {checks.length < 1 ?
            <ListGroupItem>
              This project has no checks. <Link to="add-check">Add check!</Link>
            </ListGroupItem> : null
          }

          {checks.map((check, i) =>
            <ListGroupItem key={check.id}>
              <Link to={`/check/${check.id}`}>{check.name}</Link>
              <Tag pill className="float-xs-right" color="danger">down</Tag>
            </ListGroupItem>
          )}
        </ListGroup>
      </Col>
      <Col md="6" hidden>
        <ListGroup>
          <ListGroupItem active action>members</ListGroupItem>
          {members.map((member, i) =>
            <ListGroupItem key={member.id}>
              {member.email}
              <a
                href="#/"
                id={member.id}
                onClick={onRemoveMember}
              > &#10005;
              </a>
            </ListGroupItem>
          )}
        </ListGroup>
      </Col>
    </Row>
  );
}

ProjectInfoTable.propTypes = propTypes;
ProjectInfoTable.defaultProps = defaultProps;

export default ProjectInfoTable;
