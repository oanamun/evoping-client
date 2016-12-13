import React, { Component, PropTypes } from 'react';
import { ListGroupItem, Tag, Button, Collapse } from 'reactstrap';
import AddMemberContainer from 'modules/project/add-member/AddMemberContainer';

const propTypes = {
  info: PropTypes.string,
};

class Project extends Component {
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
    return (
      <ListGroupItem>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <strong>{this.props.info} </strong>
            </div>
            <div className="col-md-3">
              <Tag color="primary" pill>2</Tag> devices
            </div>
            <div className="col-md-3">
              <Tag color="primary" pill>12</Tag> members
              <Collapse isOpen={this.state.isOpen}>
                <AddMemberContainer />
              </Collapse>
            </div>
            <div className="col-md-3">
              <Button color="primary" onClick={this.toggle}>+</Button>
            </div>
          </div>
        </div>
      </ListGroupItem>);
  }
}

Project.propTypes = propTypes;

export default Project;
