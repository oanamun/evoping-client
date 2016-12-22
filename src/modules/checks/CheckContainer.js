import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Alert } from 'reactstrap';
import CheckDetails from './components/CheckDetails';
import CheckGraph from './components/CheckGraph';
import { loadGraph, disconnectChanel, deleteCheck, getChecks } from './stores/checkStore';

const propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  graph: PropTypes.object.isRequired,
  check: PropTypes.object.isRequired,
  error: PropTypes.string,
  redirect: PropTypes.bool,
  dispatchLoadGraph: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  dispatchDisconnectChanel: PropTypes.func.isRequired,
  dispatchDeleteCheck: PropTypes.func.isRequired,
  dispatchGetChecks: PropTypes.func.isRequired,
};

const defaultProps = {
  loggedInUser: {},
  graph: {},
  check: {},
  error: '',
  redirect: false,
  dispatchLoadGraph: () => {
  },
  dispatchDisconnectChanel: () => {
  },
  dispatchDeleteCheck: () => {
  },
  dispatchGetChecks: () => {
  },
};

class CheckContainer extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    if (this.props.loggedInUser.email) {
      this.props.dispatchLoadGraph(this.props.params);
    }
  }

  componentWillUnmount() {
    console.log('unmount');
    if (this.props.loggedInUser.email) {
      this.props.dispatchDisconnectChanel();
    }
  }

  onDelete(event) {
    this.props.dispatchDeleteCheck({ id: event.currentTarget.id });
  }

  render() {
    const { graph, check, loggedInUser, error, redirect, params, dispatchGetChecks } = this.props;
    if (!loggedInUser.email) {
      return <Redirect to={'/login'} />;
    }
    if (!check.id) {
      dispatchGetChecks(params.projectId);
    }
    return (
      <div>
        <CheckDetails check={check} onDelete={this.onDelete} />
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

function findById(checks, id) {
  return checks.find((item) => item.id == id);
}

const mapStateToProps = (state, { params }) => ({
  loggedInUser: state.loginStore.loggedInUser,
  check: findById(state.checkStore.checks, params.checkId),
  error: state.checkStore.error,
  redirect: state.checkStore.redirect,
  graph: state.checkStore.currentGraph,
});

const mapDispatchToProps = {
  dispatchLoadGraph: loadGraph,
  dispatchDisconnectChanel: disconnectChanel,
  dispatchDeleteCheck: deleteCheck,
  dispatchGetChecks: getChecks,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckContainer);
