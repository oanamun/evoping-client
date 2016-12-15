import React, { Component, PropTypes } from 'react';
import { ListGroupItem, Button, Collapse, Row, Col, Input } from 'reactstrap';
import AddMemberContainer from 'modules/project/add-member/AddMemberContainer';
import ProjectInfoTable from './ProjectInfoTable';

const propTypes = {
  project: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const defaultProps = {
  project: {},
  onDelete: () => {},
  onEdit: () => {},
};

class ProjectListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      editMode: false,
      project: this.props.project,
    };
    this.toggle = this.toggle.bind(this);
    this.edit = this.edit.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
  }

  onFieldUpdate(event) {
    this.setState({ project: { ...this.state.project, name: event.currentTarget.value } });
  }

  edit() {
    this.setState({ editMode: true });
  }

  saveChanges() {
    this.setState({ editMode: false });
    this.props.onEdit(this.state.project);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { project, onDelete } = this.props;
    return (
      <ListGroupItem>
        <Row>
          <Col md="9" onClick={this.toggle}>
            { this.state.editMode ?
              <Input
                type="text"
                name="project"
                value={this.state.project.name}
                onChange={this.onFieldUpdate}
              /> :
              <strong>
                {this.state.project.name}
              </strong>
            }
          </Col>
          <Col md="3">
            { this.state.editMode ?
              <Button
                outline color="warning"
                className="mr-2"
                onClick={this.saveChanges}
              >save
              </Button> :
              <Button
                outline color="warning"
                className="mr-2"
                onClick={this.edit}
              >edit
              </Button>
            }
            <Button
              outline color="danger"
              id={project.id}
              onClick={onDelete}
            >delete
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Collapse isOpen={this.state.isOpen}>
              <Row>
                <Col md="9">
                  <ProjectInfoTable />
                </Col>
                <Col md="3">
                  <AddMemberContainer />
                  <Button outline color="primary">
                    add
                  </Button>
                </Col>
              </Row>
            </Collapse>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

ProjectListItem.propTypes = propTypes;
ProjectListItem.defaultProps = defaultProps;

export default ProjectListItem;
