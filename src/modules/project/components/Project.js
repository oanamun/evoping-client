import React, { PropTypes } from 'react';
import { ListGroupItem, Tag } from 'reactstrap';

const propTypes = {
  info: PropTypes.number,
};

function Project({ info }) {
  return (
    <ListGroupItem>
      {info} name
      devices
      <Tag pill> 12</Tag>
      members
      <Tag pill> 12</Tag>
    </ListGroupItem>);
}

Project.propTypes = propTypes;

export default Project;
