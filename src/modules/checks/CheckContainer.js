import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Alert } from 'reactstrap';
import { getProjects } from 'modules/project/stores/projectsStore';
import CheckDetails from './components/CheckDetails';
import CheckGraph from './components/CheckGraph';
import {
  loadGraph,
  disconnectChanel,
  deleteCheck,
  getChecks,
} from './stores/checkStore';

const propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  graph: PropTypes.object.isRequired,
  check: PropTypes.object.isRequired,
  redirect: PropTypes.bool,
  project: PropTypes.object.isRequired,
  error: PropTypes.string,
  dispatchLoadGraph: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  dispatchDisconnectChanel: PropTypes.func.isRequired,
  dispatchDeleteCheck: PropTypes.func.isRequired,
  dispatchGetChecks: PropTypes.func.isRequired,
  dispatchGetProjects: PropTypes.func.isRequired,
};

const defaultProps = {
  loggedInUser: {},
  graph: {},
  check: {},
  redirect: false,
  project: {},
  error: '',
  dispatchLoadGraph: () => {
  },
  dispatchDisconnectChanel: () => {
  },
  dispatchDeleteCheck: () => {
  },
  dispatchGetChecks: () => {
  },
  dispatchGetProjects: () => {
  },
};

class CheckContainer extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    const { loggedInUser, dispatchLoadGraph, params, project, dispatchGetProjects } = this.props;
    if (loggedInUser.email) {
      dispatchLoadGraph(params);
    }
    if (!project.id) {
      dispatchGetProjects();
    }
  }

  componentWillUnmount() {
    console.log('unmount');
    if (this.props.loggedInUser.email) {
      this.props.dispatchDisconnectChanel(this.props.project.id);
    }
  }

  onDelete(event) {
    this.props.dispatchDeleteCheck({ id: event.currentTarget.id });
  }

  render() {
    const { graph, check, redirect, project, loggedInUser, error, params } = this.props;
    if (!loggedInUser.email) {
      return <Redirect to={'/login'} />;
    }
    if (redirect) {
      return <Redirect to={`/project/${this.props.params.projectId}`} />;
    }
    if (!check.id) {
      this.props.dispatchGetChecks(params.projectId);
    }
    return (
      <div>
        <CheckDetails check={check} project={project} onDelete={this.onDelete} />
        <Alert color="danger" isOpen={error.length !== 0}>
          {error}
        </Alert>
        <CheckGraph graph={graph} />
      </div>
    );
  }
}

CheckContainer.propTypes = propTypes;
CheckContainer.defaultProps = defaultProps;

function findById(list, id) {
  return list.find((item) => item.id === parseInt(id, 10));
}

const mapStateToProps = (state, { params }) => ({
  loggedInUser: state.loginStore.loggedInUser,
  check: findById(state.checkStore.checks, params.checkId),
  redirect: state.checkStore.redirect,
  project: findById(state.projectsStore.projects, params.projectId),
  error: state.checkStore.error,
  graph: state.checkStore.currentGraph,
});

const mapDispatchToProps = {
  dispatchLoadGraph: loadGraph,
  dispatchDisconnectChanel: disconnectChanel,
  dispatchDeleteCheck: deleteCheck,
  dispatchGetChecks: getChecks,
  dispatchGetProjects: getProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckContainer);
