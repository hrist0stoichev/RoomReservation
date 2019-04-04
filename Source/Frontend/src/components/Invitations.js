import React from 'react';
import { ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import './Invitations.scss';
import config from '../config';

class Invitations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      invitations: []
    }

    this.rejectInvitation = this.rejectInvitation.bind(this);
    this.acceptInvitation = this.acceptInvitation.bind(this);
    this.fetchInvitations = this.fetchInvitations.bind(this);
  }

  componentWillMount() {
    fetch(`${config.endpoint}/invitations`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`,
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ invitations: res.ToInvitations });
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchInvitations() {
    fetch(`${config.endpoint}/invitations`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`,
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ invitations: res.ToInvitations });
      })
      .catch(error => {
        console.log(error);
      });
  }

  rejectInvitation(id) {
    fetch(`${config.endpoint}/invitations/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`,
      },
    })
      .then(() => this.fetchInvitations())
      .catch((error) => {
        this.props.showError('Could not reject invitation.');
        console.log(error);
      });
  }

  acceptInvitation(id) {
    fetch(`${config.endpoint}/invitations/${id}/accept`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`,
      },
    })
      .then(() => this.fetchInvitations())
      .catch((error) => {
        this.props.showError('Could not approve invitation.');
        console.log(error);
      });
  }

  render() {
    if (this.props.isLoading) {
      return <Loader />;
    } else {
      return (
        <div>
          <p style={{ margin: '0.5em 1em' }}>Your Invitations</p>
          <ListGroup flush>
            {this.state.invitations.map((invitation, index) => (
              <ListGroupItem tag="div" key={index}>
                <Row>
                  <Col md="8">
                    <div>From:</div>
                    <div>{invitation.FromStudentName}</div>
                    <div>Room: <span>#{invitation.RoomNumber}</span></div>
                  </Col>
                  <Col md="4" className="text-right" style={{ paddingTop: '1.5rem' }}>
                    <span onClick={() => { this.rejectInvitation(invitation.Id)}}>
                      <svg className="svg-icon invite-button" viewBox="0 0 20 20" style={{ marginRight: '0.44rem' }}>
                        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                      </svg>
                    </span>
                    <span onClick={() => { this.acceptInvitation(invitation.Id)}}>
                      <svg class="svg-icon invite-button" viewBox="0 0 20 20">
                        <path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"></path>
                      </svg>
                    </span>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
          <Link to="/invitations/create">
            <Button color="primary" style={{ margin: '1rem 0 0.7rem' }}>Invite New Roommate</Button>
          </Link>
        </div>
      );
    }
  }
}

export default Invitations;
