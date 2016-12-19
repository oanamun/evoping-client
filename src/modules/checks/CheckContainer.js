import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CheckDetails from './components/CheckDetails';
import CheckGraph from './components/CheckGraph';
import { loadGraph, disconnectChanel } from './stores/checkStore';

const propTypes = {
  graph: PropTypes.object.isRequired,
  check: PropTypes.object.isRequired,
  dispatchLoadGraph: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  dispatchDisconnectChanel: PropTypes.func.isRequired,
};

const defaultProps = {
  graph: {},
  check: {},
  dispatchLoadGraph: () => {},
  dispatchDisconnectChanel: () => {},
};

class CheckContainer extends Component { // eslint-disable-line

  componentWillMount() {
    console.log(`mount ${this.props.params.id}`);
    this.props.dispatchLoadGraph(this.props.params.id);
  }

  componentWillUnmount() {
    console.log('unmount');
    this.props.dispatchDisconnectChanel();
  }

  render() {
    const { graph, check } = this.props;
    return (
      <div>
        <CheckDetails check={check} />
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
  graph: state.checkStore.currentGraph,
});

const mapDispatchToProps = {
  dispatchLoadGraph: loadGraph,
  dispatchDisconnectChanel: disconnectChanel,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckContainer);