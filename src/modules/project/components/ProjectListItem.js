import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { ListGroupItem, Button, Collapse, Row, Col, Input } from 'reactstrap';
import AddMemberContainer from 'modules/project/add-member/AddMemberContainer';
import { editProject, deleteProject, removeMember, addMember } from '../stores/projectsStore';
import { getChecks } from '../../checks/stores/checkStore';

const propTypes = {
  project: PropTypes.object.isRequired,
  checks: PropTypes.array,
  dispatchGetChecks: PropTypes.func,
  dispatchEditProject: PropTypes.func,
  dispatchDeleteProject: PropTypes.func,
  dispatchRemoveMember: PropTypes.func,
  dispatchAddMember: PropTypes.func,
};

const defaultProps = {
  project: {},
  checks: [],
  dispatchGetChecks: () => {},
  dispatchEditProject: () => {},
  dispatchDeleteProject: () => {},
  dispatchRemoveMember: () => {},
  dispatchAddMember: () => {},
};

class ProjectListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      project: this.props.project,
      selectedMember: {},
    };
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

  render() {
    return (
      <ListGroupItem>
        <Row>
          <Col md="9">
            { this.state.editMode ?
              <Input
                className="mb-1"
                type="text"
                name="project"
                value={this.state.project.name}
                onChange={this.onFieldUpdate}
              /> :
              <strong>
                <Link to={`/project/${this.state.project.id}`}>{this.state.project.name}</Link>
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
      </ListGroupItem>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  checks: state.checkStore.checks.filter((check) => check.project_id === ownProps.project.id),
});

const mapDispatchToProps = {
  dispatchGetChecks: getChecks,
  dispatchEditProject: editProject,
  dispatchDeleteProject: deleteProject,
  dispatchRemoveMember: removeMember,
  dispatchAddMember: addMember,
};

ProjectListItem.propTypes = propTypes;
ProjectListItem.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListItem);
