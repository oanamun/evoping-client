import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Alert } from 'reactstrap';
import { addCheck } from '../stores/checkStore';
import { getProjects } from '../../project/stores/projectsStore';
import AddCheckForm from './components/AddCheckForm';

const propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  projects: PropTypes.array,
  redirect: PropTypes.bool,
  error: PropTypes.string,
  dispatchAddCheck: PropTypes.func,
  dispatchGetProjects: PropTypes.func,
};

const defaultProps = {
  loggedInUser: {},
  projects: [],
  redirect: [],
  error: [],
  dispatchAddCheck: () => {},
  dispatchGetProjects: () => {},
};

class AddCheckContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCheck: { type: 'web', special_info: "{'method':'GET'}" },
      selectedProject: { value: 0 },
      redirectToHome: false,
    };
    this.saveCheck = this.saveCheck.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentWillMount() {
    if (this.props.loggedInUser.email) {
      this.props.dispatchGetProjects();
    }
  }

  saveCheck() {
    const check = this.state.newCheck;
    check.project_id = this.state.selectedProject.value;
    this.props.dispatchAddCheck(check);
  }

  updateField(event) {
    const { name, value } = event.currentTarget;
    if (name === 'selectedProject') {
      this.setState({ selectedProject: value });
    } else {
      const check = this.state.newCheck;
      check[name] = value;
      this.setState({ newCheck: check });
    }
  }

  render() {
    const { loggedInUser, error, redirect } = this.props;
    if (!loggedInUser.email) {
      return <Redirect to={'/login'} />;
    }
    if (redirect) {
      return <Redirect to={`/project/${this.state.selectedProject.value}`} />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <Alert color="danger" isOpen={error.length !== 0}>
              {error}
            </Alert>
            <AddCheckForm
              projects={this.props.projects}
              handleSubmit={this.saveCheck}
              onUpdateField={this.updateField}
              selectedProject={this.state.selectedProject}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  loggedInUser: state.loginStore.loggedInUser,
  error: state.checkStore.error,
  redirect: state.checkStore.redirect,
  projects: state.projectsStore.projects.map((project) =>
  ({ label: project.name, value: project.id })),
});

const mapDispatchToProps = {
  dispatchGetProjects: getProjects,
  dispatchAddCheck: addCheck,
};

AddCheckContainer.propTypes = propTypes;
AddCheckContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddCheckContainer);

