import React, { PropTypes } from 'react';
import { ListGroupItem, Tag, Button } from 'reactstrap';

const propTypes = {
  info: PropTypes.string,
};

function Project({ info }) {
  return (
    <ListGroupItem>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <strong>{info} </strong>
          </div>
          <div className="col-md-3">
            <Tag color="primary" pill>2</Tag> devices
          </div>
          <div className="col-md-3">
            <Tag color="primary" pill>12</Tag> members
          </div>
          <div className="col-md-3">
            <Button color="primary"><i className="fa fa-user-plus" /></Button>
          </div>
        </div>
      </div>
    </ListGroupItem>);
}

Project.propTypes = propTypes;

export default Project;
