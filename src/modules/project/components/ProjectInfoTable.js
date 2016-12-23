import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Row, Col, Tag } from 'reactstrap';
import { getProjects, readData, disconnectChanel } from '../stores/projectsStore';
import { socketAuthenticate } from '../../login/loginStore';

const propTypes = {
  project: PropTypes.object,
  lastCheck: PropTypes.object,
  params: PropTypes.object.isRequired,
  dispatchGetProjects: PropTypes.func,
  dispatchReadData: PropTypes.func,
  dispatchDisconnectChanel: PropTypes.func,
  dispatchSocketAuthenticate: PropTypes.func,
};

const defaultProps = {
  project: { Check: [] },
  lastCheck: { check: { id: '', responseTime: '' } },
  params: {},
  dispatchGetProjects: () => {},
  dispatchReadData: () => {
  },
  dispatchDisconnectChanel: () => {
  },
  dispatchSocketAuthenticate: () => {
  },
};

class ProjectInfoTable extends Component {

  componentWillMount() {
    const { project, dispatchGetProjects, dispatchSocketAuthenticate } = this.props;
    dispatchSocketAuthenticate(() => {
      if (!project.name) {
        dispatchGetProjects(() => {
          this.props.dispatchReadData(project.id);
        });
      } else {
        this.props.dispatchReadData(project.id);
      }
    });
  }

  componentWillUnmount() {
    console.log('unmount');
    this.props.dispatchDisconnectChanel(this.props.project.id);
  }

  render() {
    const { project, params, lastCheck } = this.props;
    const { projectId } = params;
    console.log(lastCheck.check);
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
                {lastCheck.check.id === check.id && lastCheck.check.responseTime ?
                  <Tag pill className="float-xs-right" color="success">up</Tag> : null
                }
                {lastCheck.check.id === check.id && lastCheck.check.responseTime === false ?
                  <Tag pill className="float-xs-right" color="danger">down</Tag> : null
                }
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
  lastCheck: state.projectsStore.lastChecks.find((check) =>
  check.project_id === parseInt(params.projectId, 10)),
});

const mapDispatchToProps = {
  dispatchGetProjects: getProjects,
  dispatchReadData: readData,
  dispatchDisconnectChanel: disconnectChanel,
  dispatchSocketAuthenticate: socketAuthenticate,
};

ProjectInfoTable.propTypes = propTypes;
ProjectInfoTable.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfoTable);
