import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import CheckDetails from './components/CheckDetails';
import CheckGraph from './components/CheckGraph';
import { loadGraph, disconnectChanel, deleteCheck } from './stores/checkStore';

const propTypes = {
  graph: PropTypes.object.isRequired,
  check: PropTypes.object.isRequired,
  error: PropTypes.string,
  dispatchLoadGraph: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  dispatchDisconnectChanel: PropTypes.func.isRequired,
  dispatchDeleteCheck: PropTypes.func.isRequired,
};

const defaultProps = {
  graph: {},
  check: {},
  error: '',
  dispatchLoadGraph: () => {},
  dispatchDisconnectChanel: () => {},
  dispatchDeleteCheck: () => {},
};

class CheckContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    console.log(`mount ${this.props.params.id}`);
    this.props.dispatchLoadGraph(this.props.params.id);
  }

  componentWillUnmount() {
    console.log('unmount');
    this.props.dispatchDisconnectChanel();
  }

  onDelete(event) {
    this.props.dispatchDeleteCheck({ id: event.currentTarget.id });
    this.setState({ redirect: true });
  }

  render() {
    const { graph, check } = this.props;
    if (this.state.redirect) {
      return <Redirect to={'/projects'} />;
    }
    return (
      <div>
        <CheckDetails check={check} onDelete={this.onDelete} />
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
  check: findById(state.checkStore.checks, ownProps.params.id),
  error: state.checkStore.error,
  graph: state.checkStore.currentGraph,
});

const mapDispatchToProps = {
  dispatchLoadGraph: loadGraph,
  dispatchDisconnectChanel: disconnectChanel,
  dispatchDeleteCheck: deleteCheck,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckContainer);
