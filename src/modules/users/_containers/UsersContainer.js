import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserDetails from '../_components/UserDetails';
import { updateUsername } from '../_stores/usersStore';

const propTypes = {
  currentUser: PropTypes.object.isRequired,
  dispatchUpdateUsername: PropTypes.func.isRequired,
};

const defaultProps = {
  currentUser: {},
  dispatchUpdateUsername: () => {},
};

class UsersContainer extends Component {
  constructor(props) {
    super(props);
    this.updateUsername = this.updateUsername.bind(this);
  }

  updateUsername() {
    // TODO take the name from the actual field;
    this.props.dispatchUpdateUsername({
      username: 'murgul_sur',
    });
  }

  render() {
    const { currentUser } = this.props;
    return (
      <UserDetails
        currentUser={currentUser}
        updateUsername={this.updateUsername}
      />
    );
  }
}

UsersContainer.propTypes = propTypes;
UsersContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = {
  dispatchUpdateUsername: updateUsername,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
