import React, { Component, PropTypes } from 'react';
import { ListGroupItem, Tag, Button, Collapse } from 'reactstrap';
import AddMemberContainer from 'modules/project/add-member/AddMemberContainer';

const propTypes = {
  project: PropTypes.object,
};

const defaultProps = {
  project: {},
};

class ProjectListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    const project = this.props.project;
    return (
      <ListGroupItem>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <strong>{project.name}</strong>
            </div>
            <div className="col-md-3">
              <Tag color="primary" pill>{project.devices}</Tag> devices
            </div>
            <div className="col-md-3">
              <Tag color="primary" pill>{project.members}</Tag> members
              <Collapse isOpen={this.state.isOpen}>
                <AddMemberContainer />
              </Collapse>
            </div>
            <div className="col-md-3">
              <Button color="primary" onClick={this.toggle}>
                <i className="fa fa-user-plus" />
              </Button>
            </div>
          </div>
        </div>
      </ListGroupItem>);
  }
}

ProjectListItem.propTypes = propTypes;
ProjectListItem.defaultProps = defaultProps;

export default ProjectListItem;
