import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { addCheck } from '../stores/checkStore';
import AddCheckForm from './components/AddCheckForm';

const propTypes = {
  projects: PropTypes.array,
  dispatchAddCheck: PropTypes.func,
  redirectToHome: PropTypes.bool,
};
const defaultProps = {
  projects: [],
  dispatchAddCheck: () => {},
  redirectToHome: false,
};

class AddCheckContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceInfo: {
        name: '',
        description: '',
        isPublic: false,
        currentProject: this.props.projects[0],
      },
      redirectToHome: false,
    };
    this.handleSave = this.handleSave.bind(this);
    this.updateField = this.updateField.bind(this);
  }
  handleSave(evt) {
    evt.preventDefault();
    this.props.dispatchAddCheck(this.state.deviceInfo);
  }
  updateField(evt) {
    const { name, value } = evt.currentTarget;
    const device = this.state.deviceInfo;
    if (name === 'selectPublic') {
      device.isPublic = value === 'Yes' ? 1 : 0;
    } else {
      device[name] = value;
    }
    this.setState({ deviceInfo: device });
  }
  render() {
    if (this.props.redirectToHome) {
      return <Redirect to={'/'} />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <AddCheckForm
              projects={this.props.projects}
              handleSubmit={this.handleSave}
              onUpdateField={this.updateField}
              currentProject={this.state.deviceInfo.currentProject}
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
  redirectToHome: state.checkStore.redirectToHome,

});

const mapDispatchToProps = {
  dispatchAddCheck: addCheck,
};

AddCheckContainer.propTypes = propTypes;
AddCheckContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddCheckContainer);

