import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

class HeaderContainer extends Component { // eslint-disable-line
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
          <NavItem>
            <Link className="nav-link" to="/login">Login</Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default HeaderContainer;
