import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  index: PropTypes.number.isRequired,
  device: PropTypes.object.isRequired,
};

const defaultProps = {
  index: 0,
  device: {},
};

function DevicesTableRow({ index, device }) {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>
        <Link className="nav-link" to={`/device/${device.id}`}>{device.name}</Link>
      </td>
      <td>
        <Link className="nav-link" to="/projects">{device.project}</Link>
      </td>
      <td>
        {device.status ?
          <span className="tag tag-success tag-pill">
            working
          </span> :
          <span className="tag tag-danger tag-pill">
            down
          </span>}
      </td>
    </tr>
  );
}

DevicesTableRow.propTypes = propTypes;
DevicesTableRow.defaultProps = defaultProps;

export default DevicesTableRow;
