import React, { PropTypes } from 'react';
import { Card, CardLink, CardTitle, CardText, Row, Col } from 'reactstrap';

const propTypes = {
  device: PropTypes.object.isRequired,
};

export const defaultProps = {
  device: { name: '-', host: '-', description: '-' },
};

function DeviceDetails({ device }) {
  return (
    <Card block inverse className="device-card mb-3">
      <Row>
        <Col md="4">
          <CardTitle color="primary">{device.name}</CardTitle>
        </Col>
        <Col md="4">
          <CardText>
            <small>description</small>
          </CardText>
          <CardText className="device-info">{device.description}</CardText>
        </Col>
        <Col md="4">
          <CardText>
            <small>host</small>
          </CardText>
          <CardLink className="device-info" href="#">{device.host}</CardLink>
        </Col>
      </Row>
    </Card>
  );
}

DeviceDetails.propTypes = propTypes;
DeviceDetails.defaultProps = defaultProps;

export default DeviceDetails;
