import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Alert } from 'reactstrap';
import CheckDetails from './components/CheckDetails';
import CheckGraph from './components/CheckGraph';
import { loadGraph, disconnectChanel, deleteCheck } from './stores/checkStore';

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
};

const defaultProps = {
  loggedInUser: {},
  graph: {},
  check: {},
  error: '',
  redirect: false,
  dispatchLoadGraph: () => {},
  dispatchDisconnectChanel: () => {},
  dispatchDeleteCheck: () => {},
};

class CheckContainer extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    console.log(`mount ${this.props.params.id}`);
    if (this.props.loggedInUser.email && this.props.check.name) {
      this.props.dispatchLoadGraph(this.props.params.id);
    }
  }

  componentWillUnmount() {
    console.log('unmount');
    if (this.props.loggedInUser.email && this.props.check.name) {
      this.props.dispatchDisconnectChanel();
    }
  }

  onDelete(event) {
    this.props.dispatchDeleteCheck({ id: event.currentTarget.id });
  }

  render() {
    const { graph, check, loggedInUser, error, redirect } = this.props;
    if (!loggedInUser.email) {
      return <Redirect to={'/login'} />;
    }
    if (redirect || !check.name) {
      return <Redirect to={'/projects'} />;
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
  return checks.find((item) => item.id === parseInt(id, 10));
}

const mapStateToProps = (state, ownProps) => ({
  loggedInUser: state.loginStore.loggedInUser,
  check: findById(state.checkStore.checks, ownProps.params.id),
  error: state.checkStore.error,
  redirect: state.checkStore.redirect,
  graph: state.checkStore.currentGraph,
});

const mapDispatchToProps = {
  dispatchLoadGraph: loadGraph,
  dispatchDisconnectChanel: disconnectChanel,
  dispatchDeleteCheck: deleteCheck,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckContainer);
