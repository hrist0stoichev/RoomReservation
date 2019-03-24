import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import LoginForm from '../components/Login/LoginForm';
import Loader from '../components/Loader';
import './Login.scss';

const renderLoader = (props) => {
  if (props.isLoading) {
    return <Loader />;
  }
}

const renderIsAuthenticated = (props) => {
  if (props.isAuthenticated) {
    return <Redirect to='/students' />;
  }
  return '';
}

const Login = (props) => (
  <div id="login">
    <Container>
      <Row className="vh-100">
        <Col md={{ size: 10, offset: 1 }} className="my-auto position-relative">
          { renderIsAuthenticated(props) }
          <Card className="p-2">
            <CardBody>
              <Row>
                <Col className="pr-lg-5 pb-5 pb-lg-0 border-right" lg="6">
                  <LoginForm login={props.login} />
                  { renderLoader(props) }
                </Col>
                <Col className="pl-lg-5" lg="6">
                  <h6 className="mb-3">Login instructions</h6>
                  <p>Please, enter your Username and Password and click the Login button below.</p>
                  <Row>
                    <Col md="4"><small className="text-uppercase">Username</small></Col>
                    <Col md="8"><small>username@studin.aubgin.local</small></Col>
                  </Row>
                  <Row>
                    <Col md="4"><small className="text-uppercase">Password</small></Col>
                    <Col md="8"><small>•••••••• (domain password)</small></Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Login;
