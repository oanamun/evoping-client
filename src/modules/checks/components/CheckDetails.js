import React, { PropTypes } from 'react';
import { Card, CardLink, CardTitle, CardText, Row, Col } from 'reactstrap';

const propTypes = {
  check: PropTypes.object.isRequired,
};

export const defaultProps = {
  check: { name: '-', host: '-', description: '-' },
};

function CheckDetails({ check }) {
  return (
    <Card block inverse className="check-card mb-3">
      <Row>
        <Col md="4">
          <CardTitle color="primary">{check.name}</CardTitle>
        </Col>
        <Col md="4">
          <CardText>
            <small>URL</small>
          </CardText>
          <CardLink className="check-info" href="#">{check.host}</CardLink>
        </Col>
        <Col md="4">
          <CardText>
            <small>interval</small>
          </CardText>
          <CardText className="check-info">{check.interval} seconds</CardText>
        </Col>
      </Row>
    </Card>
  );
}

CheckDetails.propTypes = propTypes;
CheckDetails.defaultProps = defaultProps;

export default CheckDetails;
