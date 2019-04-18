import React from 'react';
import MainLayout from '../components/MainLayout';
import { Row, Col, Card, CardTitle, CardBody, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { connect }  from 'react-redux';
import IsStudent from '../containers/IsStudent';
import IsAdmin from '../containers/IsAdmin';
import config from '../config';
import { Redirect } from 'react-router-dom';
import TOS from '../containers/TOS';

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
      room: {},
      adminStats: {}
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

    if (this.props.auth.role === 'Admin') {
      fetch(`${config.endpoint}/users/statistics`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.auth.accessToken}`,
        }
      })
        .then(res => res.json())
        .then(res => this.setState({ adminStats: res }))
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
        <IsStudent>
          <Row>
            <Col>
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
            </Col>
            <Col>
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
                    </ListGroup>
                  </CardBody>
                </Card>
            </Col>
          </Row>
          <TOS />
        </IsStudent>
        <IsAdmin>
            <Row>
              <Col>
                <Card className="mb-4">
                  <CardTitle><h5 className="mt-4 ml-4">Skaptopara 1</h5></CardTitle>
                  <CardBody>
                    <ListGroup>
                      <ListGroupItem>
                        <ListGroupItemHeading>Occupied Rooms</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.adminStats.Skapto1OccupiedRooms || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Free Rooms</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.adminStats.Skapto1FreeRooms || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Total Rooms</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.adminStats.Skapto1TotalRooms || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
            </Col>
            <Col>
                <Card className="mb-4">
                  <CardTitle><h5 className="mt-4 ml-4">Skaptopara 2</h5></CardTitle>
                  <CardBody>
                    <ListGroup>
                      <ListGroupItem>
                        <ListGroupItemHeading>Occupied Rooms</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.adminStats.Skapto2OccupiedRooms || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Free Rooms</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.adminStats.Skapto2FreeRooms || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Total Rooms</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.adminStats.Skapto2TotalRooms || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
            </Col>
            <Col>
                <Card className="mb-4">
                  <CardTitle><h5 className="mt-4 ml-4">Skaptopara 3</h5></CardTitle>
                  <CardBody>
                    <ListGroup>
                      <ListGroupItem>
                        <ListGroupItemHeading>Occupied Rooms</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.adminStats.Skapto3OccupiedRooms || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Free Rooms</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.adminStats.Skapto3FreeRooms || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Total Rooms</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.adminStats.Skapto3TotalRooms || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4">
                <Card className="mb-4">
                  <CardTitle><h5 className="mt-4 ml-4">Students</h5></CardTitle>
                  <CardBody>
                    <ListGroup>
                      <ListGroupItem>
                        <ListGroupItemHeading>On Campus</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.adminStats.StudentsOnCampus || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Off Campus</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.adminStats.StudentsOffCampus || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Total</ListGroupItemHeading>
                        <ListGroupItemText>{this.state.adminStats.TotalStudents || 'N/A'}</ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </IsAdmin>
        </MainLayout>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
