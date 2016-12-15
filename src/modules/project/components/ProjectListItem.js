import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem, Button, Collapse, Row, Col, Input } from 'reactstrap';
import AddMemberContainer from 'modules/project/add-member/AddMemberContainer';
import ProjectInfoTable from './ProjectInfoTable';
import { editProject, deleteProject, removeMember, addMember } from '../stores/projectsStore';

const propTypes = {
  project: PropTypes.object.isRequired,
  devices: PropTypes.array.isRequired,
  dispatchEditProject: PropTypes.func,
  dispatchDeleteProject: PropTypes.func,
  dispatchRemoveMember: PropTypes.func,
  dispatchAddMember: PropTypes.func,
};

const defaultProps = {
  project: {},
  devices: [],
  dispatchEditProject: () => {},
  dispatchDeleteProject: () => {},
  dispatchRemoveMember: () => {},
  dispatchAddMember: () => {},
};

class ProjectListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      editMode: false,
      project: this.props.project,
      selectedMember: {},
    };
    this.toggle = this.toggle.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.editProject = this.editProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
    this.onMemberSelect = this.onMemberSelect.bind(this);
    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
  }

  onFieldUpdate(event) {
    this.setState({ project: { ...this.state.project, name: event.currentTarget.value } });
  }

  onMemberSelect(member) {
    this.setState({ selectedMember: member });
  }

  addMember() {
    if (this.state.selectedMember.email) {
      this.props.dispatchAddMember({
        project_id: this.props.project.id,
        user: this.state.selectedMember,
      });
    }
  }

  openEdit() {
    this.setState({ editMode: true });
  }

  deleteProject() {
    this.props.dispatchDeleteProject({ id: this.props.project.id });
  }

  editProject() {
    this.setState({ editMode: false });
    this.props.dispatchEditProject(this.state.project);
  }

  removeMember(event) {
    this.props.dispatchRemoveMember({
      project_id: this.props.project.id,
      member_id: event.currentTarget.id,
    });
  }

  toggle() {
    if (!this.state.editMode) {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  render() {
    const { project, devices } = this.props;
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
                onClick={this.editProject}
              >save
              </Button> :
              <div>
                <Button
                  outline color="warning"
                  className="mr-2"
                  onClick={this.openEdit}
                >edit
                </Button>
                <Button
                  outline color="danger"
                  onClick={this.deleteProject}
                >delete
                </Button>
              </div>
            }
          </Col>
        </Row>
        <Row>
          <Col>
            <Collapse isOpen={this.state.isOpen}>
              <Row>
                <Col md="9">
                  <ProjectInfoTable
                    members={project.members}
                    devices={devices}
                    onRemoveMember={this.removeMember}
                  />
                </Col>
                <Col md="3">
                  <AddMemberContainer onSelect={this.onMemberSelect} />
                  <Button outline color="primary" onClick={this.addMember}>add
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

const mapStateToProps = (state, ownProps) => ({
  devices: state.deviceStore.devices.filter((device) => device.project_id === ownProps.project.id),
});

const mapDispatchToProps = {
  dispatchEditProject: editProject,
  dispatchDeleteProject: deleteProject,
  dispatchRemoveMember: removeMember,
  dispatchAddMember: addMember,
};

ProjectListItem.propTypes = propTypes;
ProjectListItem.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListItem);
