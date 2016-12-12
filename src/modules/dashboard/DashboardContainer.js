import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router';

class DashboardContainer extends Component { // eslint-disable-line
  render() {
    return (
      <Table inverse responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Device name</th>
            <th>Project</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td><Link className="nav-link" to="/device/1">Evo live</Link></td>
            <td>Evotalks</td>
            <td>
              <span className="tag tag-danger tag-pill">
                down
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td><Link className="nav-link" to="/device/1">Evo staging</Link></td>
            <td>Evotalks</td>
            <td>
              <span className="tag tag-success tag-pill">
                working
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td><Link className="nav-link" to="/device/1">SIIT staging</Link></td>
            <td>SIIT</td>
            <td>
              <span className="tag tag-success tag-pill">
                working
              </span>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default DashboardContainer;
