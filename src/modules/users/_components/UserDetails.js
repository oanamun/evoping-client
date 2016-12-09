import React, { PropTypes } from 'react';

const propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateUsername: PropTypes.func.isRequired,
};

export const defaultProps = {
  currentUser: {},
  updateUsername: () => {},
};

function UserDetails({ currentUser, updateUsername }) {
  return (
    <div>
      <p>
        Name : {currentUser.name}
      </p>
      <p onClick={updateUsername}>
        Username : {currentUser.username}
      </p>
      <p>
        Age : {currentUser.age}
      </p>
    </div>
  );
}

UserDetails.propTypes = propTypes;
UserDetails.defaultProps = defaultProps;

export default UserDetails;
