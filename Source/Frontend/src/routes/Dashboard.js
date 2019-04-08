import React from 'react';
import MainLayout from '../components/MainLayout';
import { Row, Col, Card, CardTitle, CardBody, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { connect }  from 'react-redux';
import IsStudent from '../containers/IsStudent';
import config from '../config';

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(state) {
  return {

  };
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {}
    };
  }

  componentWillMount() {
    if (this.props.auth.currentRoomNumber) {
      fetch(`${config.endpoint}/rooms/${this.props.auth.currentRoomNumber}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.auth.accessToken}`,
        }
      })
        .then(res => res.json())
        .then(res => this.setState({ room: res }))
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <div id="dashboard">
        <MainLayout
          title="Dashboard"
          secondaryNav={[]}
        >
          <Row>
            <Col>
              <IsStudent>
                <Card className="mb-4">
                  <CardTitle cla><h5 className="mt-4 ml-4">Your Room</h5></CardTitle>
                  <CardBody>
                    {this.state.room !== {} ?
                    <ListGroup>
                      <ListGroupItem>
                        <ListGroupItemHeading>Number</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.room.Number}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Capacity</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.room.Capacity}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Type</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.IsRa ? 'Resident Assistant Room' : 'Regular Room'}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Roommates</ListGroupItemHeading>
                        {this.state.room.ResidentsNames && this.state.room.ResidentsNames.length > 0 ?
                        <ListGroupItemText>
                        {this.state.room.ResidentsNames.map(roommate => <span>{roommate}<br /></span>)}
                        </ListGroupItemText> :
                        'N/A'}
                      </ListGroupItem>
                    </ListGroup>:
                    'N/A'}
                  </CardBody>
                </Card>
              </IsStudent>
              <IsStudent>
                <Card>
                  <CardTitle><h5 className="mt-4 ml-4">Current Campaign</h5></CardTitle>
                  <CardBody>
                    <ListGroup>
                      <ListGroupItem>
                        <ListGroupItemHeading>Current Phase</ListGroupItemHeading>
                        <ListGroupItemText>{this.props.auth.phase}</ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
              </IsStudent>
            </Col>
            <Col>
              <IsStudent>
                <Card className="mb-4">
                  <CardTitle><h5 className="mt-4 ml-4">Student Details</h5></CardTitle>
                  <CardBody>
                    <ListGroup>
                      <ListGroupItem>
                        <ListGroupItemHeading>ID</ListGroupItemHeading>
                        <ListGroupItemText>{this.props.auth.studentId}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Name</ListGroupItemHeading>
                        <ListGroupItemText>{this.props.auth.userName}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Registration Time</ListGroupItemHeading>
                        <ListGroupItemText>{this.props.auth.registration_time || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Current Room</ListGroupItemHeading>
                        <ListGroupItemText>{this.props.auth.currentRoomNumber || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Previous Room</ListGroupItemHeading>
                        <ListGroupItemText>{this.props.auth.previousRoomNumber || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
              </IsStudent>
            </Col>
          </Row>
        </MainLayout>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
