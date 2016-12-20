import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { addCheck } from '../stores/checkStore';
import { getProjects } from '../../project/stores/projectsStore';
import AddCheckForm from './components/AddCheckForm';

const propTypes = {
  projects: PropTypes.array,
  dispatchAddCheck: PropTypes.func,
  dispatchGetProjects: PropTypes.func,
};

const defaultProps = {
  projects: [],
  dispatchAddCheck: () => {},
  dispatchGetProjects: () => {},
};

class AddCheckContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCheck: {},
      selectedProject: null,
      redirectToHome: false,
    };
    this.saveCheck = this.saveCheck.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentWillMount() {
    this.props.dispatchGetProjects();
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
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
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

