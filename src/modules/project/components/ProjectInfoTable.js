import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Row, Col, Tag } from 'reactstrap';
import { getProjects, readData } from '../stores/projectsStore';

const propTypes = {
  project: PropTypes.object,
  params: PropTypes.object.isRequired,
  dispatchGetProjects: PropTypes.func,
  dispatchReadData: PropTypes.func,
};

const defaultProps = {
  project: { Check: [] },
  params: {},
  dispatchGetProjects: () => {},
  dispatchReadData: () => {},
};

class ProjectInfoTable extends Component {

  componentWillMount() {
    const { project, dispatchGetProjects } = this.props;
    if (!project.name) {
      dispatchGetProjects();
    }
  }

  render() {
    const { project, params } = this.props;
    const { projectId } = params;
    return (
      <Row>
        <Col md="6">
          <h1 className="display-4 mb-2">{project.name}</h1>
          <ListGroup>
            <ListGroupItem active action>
              checks
            </ListGroupItem>
            {project.Check.length < 1 ?
              <ListGroupItem>
                This project has no checks. <Link to="/add-check">Add check!</Link>
              </ListGroupItem> : null
            }

            {project.Check.map((check, i) =>
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

function findById(list, id) {
  return list.find((item) => item.id === parseInt(id, 10));
}

const mapStateToProps = (state, { params }) => ({
  project: findById(state.projectsStore.projects, params.projectId),
});

const mapDispatchToProps = {
  dispatchGetProjects: getProjects,
  dispatchReadData: readData,
};

ProjectInfoTable.propTypes = propTypes;
ProjectInfoTable.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfoTable);
