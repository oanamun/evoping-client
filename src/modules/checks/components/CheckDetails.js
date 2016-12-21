import React, { PropTypes } from 'react';
import { Card, CardLink, CardTitle, CardText, Row, Col, Button } from 'reactstrap';

const propTypes = {
  check: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};

export const defaultProps = {
  check: { name: '-', host: '-', description: '-' },
  onDelete: () => {},
};

function CheckDetails({ check, onDelete }) {
  return (
    <Card block inverse className="check-card mb-3">
      <Row>
        <Col md="3">
          <CardTitle color="primary">{check.name}</CardTitle>
        </Col>
        <Col md="3">
          <CardText>
            <small>URL</small>
          </CardText>
          <CardLink className="check-info" href="#">{check.host}</CardLink>
        </Col>
        <Col md="3">
          <CardText>
            <small>interval</small>
          </CardText>
          <CardText className="check-info">{check.check_interval} seconds</CardText>
        </Col>
        <Col md="3">
          <CardText>
            <Button className="mr-1" outline color="danger" id={check.id} onClick={onDelete}>delete</Button>
            <Button outline color="warning">edit</Button>
          </CardText>
        </Col>
      </Row>
    </Card>
  );
}

CheckDetails.propTypes = propTypes;
CheckDetails.defaultProps = defaultProps;

export default CheckDetails;
