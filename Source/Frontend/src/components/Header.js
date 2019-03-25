import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Header.scss';
import IsAuthenticated from '../containers/IsAuthenticated';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.renderLoginDropdown = this.renderLoginDropdown.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderLoginDropdown() {
    return (
      <IsAuthenticated>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Settings
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={this.props.logout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </IsAuthenticated>
    );
  }
  render() {
    return (
      <div className="w-100 bg-dark">
        <Container>
          <Row>
            <Col className="p-0">
              <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Room Reservation</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <Link to="/students">Students</Link>
                    </NavItem>
                    <NavItem>
                      <Link to="/campaign">Campaign</Link>
                    </NavItem>
                    <NavItem>
                      <Link to="/rooms">Rooms</Link>
                    </NavItem>
                    {this.renderLoginDropdown()}
                  </Nav>
                </Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default Header;