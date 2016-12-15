import React from 'react';
import { Table } from 'reactstrap';

const propTypes = {
};

const defaultProps = {
};

function ProjectInfoTable() {
  return (
    <Table inverse className="mt-1">
      <thead>
        <tr>
          <th>devices</th>
          <th>members</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>dev 2</td>
          <td>
            pers 2 <a href="/">&#10006;</a>
          </td>
        </tr>
        <tr>
          <td>dev 3</td>
          <td>
            pers 3 <a href="/">&#10006;</a>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

ProjectInfoTable.propTypes = propTypes;
ProjectInfoTable.defaultProps = defaultProps;

export default ProjectInfoTable;
