import { getChecks } from 'modules/checks/stores/checkStore';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Row, Col, Tag, Button } from 'reactstrap';

const propTypes = {
  members: PropTypes.array,
  checks: PropTypes.array,
  params: PropTypes.object.isRequired,
  dispatchGetChecks: PropTypes.func.isRequired,
};

const defaultProps = {
  members: [],
  checks: [],
  params: {},
  dispatchGetChecks: () => {},
};

class ProjectInfoTable extends Component {

  componentWillMount() {
    const { params, dispatchGetChecks } = this.props;
    const { projectId } = params;
    console.log('checks 0');
    dispatchGetChecks(projectId);
  }

  render() {
    const { checks, params } = this.props;
    const { projectId } = params;
    return (
      <Row>
        <Col md="6">
          <ListGroup>
            <ListGroupItem active action>
              checks
            </ListGroupItem>
            {checks.length < 1 ?
              <ListGroupItem>
                This project has no checks. <Link to="add-check">Add check!</Link>
              </ListGroupItem> : null
            }

            {checks.map((check, i) =>
              <ListGroupItem key={check.id}>
                <Link to={`/project/${projectId}/check/${check.id}`}>{check.name}</Link>
                <Tag pill className="float-xs-right" color="danger">down</Tag>
              </ListGroupItem>
            )}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

function findById(checks, id) {
  return checks.find((item) => item.id == id);
}

const mapStateToProps = (state, { params }) => {
  const { projectId } = params;
  return ({
    checks: state.checkStore.checks.filter((check) => check.project_id == projectId),
  });
};
const mapDispatchToProps = {
  dispatchGetChecks: getChecks,
};

ProjectInfoTable.propTypes = propTypes;
ProjectInfoTable.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfoTable);
