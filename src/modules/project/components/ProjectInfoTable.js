import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap';

const propTypes = {
  members: PropTypes.array.isRequired,
  devices: PropTypes.array.isRequired,
  onRemoveMember: PropTypes.func.isRequired,
};

const defaultProps = {
  members: [],
  devices: [],
  onRemoveMember: () => {},
};

function ProjectInfoTable({ members, devices, onRemoveMember }) {
  return (
    <Row>
      <Col md="6">
        <ListGroup>
          <ListGroupItem active action>devices</ListGroupItem>
          {devices.map((device, i) =>
            <ListGroupItem key={device.id}>
              <Link to={`/device/${device.id}`}>{device.name}</Link>
            </ListGroupItem>
          )}
        </ListGroup>
      </Col>
      <Col md="6">
        <ListGroup>
          <ListGroupItem active action>members</ListGroupItem>
          {members.map((member, i) =>
            <ListGroupItem key={member.id}>
              {member.email}
              <a
                href="#"
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
