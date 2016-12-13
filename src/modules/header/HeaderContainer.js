import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import { logout } from './../login/loginStore';

const propTypes = {
  user: PropTypes.object.isRequired,
  dispatchLogout: PropTypes.func,

};

const defaultProps = {
  user: {},
  dispatchLogout: () => {},
};

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.dispatchLogout();
  }

  render() {
    return (
      <Navbar color="faded" className="mb-3 px-3" >
        <NavbarBrand>EvoPing</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <Link className="nav-link" to="/">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/projects">Projects</Link>
          </NavItem>
        </Nav>
        <Nav className="float-xs-right" navbar>
          {this.props.user.email ?
            <span>
              <NavItem>{this.props.user.email}</NavItem>
              <NavItem>
                <Button onClick={this.logout} outline color="primary">
                  <i className="fa fa-sign-out" />
                </Button>
              </NavItem>
            </span> :
            <NavItem>
              <Link className="nav-link" to="/login">Login</Link>
            </NavItem>
          }
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.loginStore.loggedInUser,
});

const mapDispatchToProps = {
  dispatchLogout: logout,
};

HeaderContainer.propTypes = propTypes;
HeaderContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
