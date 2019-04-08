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
import RoomConfirmation from './RoomConfirmation';
import Invitations from '../containers/Invitations';
import IsAdmin from '../containers/IsAdmin';
import IsStudent from '../containers/IsStudent';

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
        <IsStudent>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Invitations
            </DropdownToggle>
            <DropdownMenu right style={{ minWidth: '21rem' }}>
              <Invitations />
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Room Confirmation
            </DropdownToggle>
            <DropdownMenu right style={{ minWidth: '21rem' }}>
              <RoomConfirmation roomConfirmed={this.props.roomConfirmed} confirmRoom={this.props.confirmRoom} />
            </DropdownMenu>
          </UncontrolledDropdown>
        </IsStudent>
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
                      <Link to="/dashboard">Dashboard</Link>
                    </NavItem>
                    <IsAdmin>
                      <NavItem>
                        <Link to="/students">Students</Link>
                      </NavItem>
                      <NavItem>
                        <Link to="/campaign">Campaign</Link>
                      </NavItem>
                    </IsAdmin>
                    <NavItem>
                      <Link to="/rooms">Rooms</Link>
                    </NavItem>
                    <IsAdmin>
                      <NavItem>
                        <Link to="/apartments">Apartments</Link>
                      </NavItem>
                      <NavItem>
                        <Link to="/invitations">Invitations</Link>
                      </NavItem>
                    </IsAdmin>
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