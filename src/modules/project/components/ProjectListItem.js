import React, { Component, PropTypes } from 'react';
import { ListGroupItem, Button, Collapse, Row, Col, Table } from 'reactstrap';
import AddMemberContainer from 'modules/project/add-member/AddMemberContainer';

const propTypes = {
  project: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const defaultProps = {
  project: {},
  onDelete: () => {},
  onEdit: () => {},
};

class ProjectListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    const { project, onDelete, onEdit } = this.props;
    return (
      <ListGroupItem>
        <Row>
          <Col md="9" onClick={this.toggle}>
            <strong>
              {project.name}
            </strong>
          </Col>
          <Col md="3">
            <Button outline color="warning" className="mr-2" onClick={onEdit}>
              edit
            </Button>
            <Button
              outline
              color="danger"
              id={project.id}
              onClick={onDelete}
            >
              delete
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Collapse isOpen={this.state.isOpen}>
              <Row>
                <Col md="9">
                  <Table inverse className="mt-1">
                    <thead>
                    <tr>
                      <th>devices</th>
                      <th>members</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>pers 1</td>
                      <td>pers 2</td>
                    </tr>
                    <tr>
                      <td>dev 2</td>
                      <td>pers 2</td>
                    </tr>
                    <tr>
                      <td>dev 3</td>
                      <td>pers 3</td>
                    </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md="3">
                  <AddMemberContainer />
                  <Button outline color="primary">
                    add
                  </Button>
                </Col>
              </Row>
            </Collapse>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

ProjectListItem.propTypes = propTypes;
ProjectListItem.defaultProps = defaultProps;

export default ProjectListItem;
