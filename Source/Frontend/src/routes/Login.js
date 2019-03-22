import React from 'react';
import { Container, Row, Col, Card, CardBody, Alert } from 'reactstrap';
import LoginForm from '../components/Login/LoginForm';
import Loader from '../components/Loader';
import './Login.scss';

const renderError = (props) => {
  if (props.isFailed) {
    return (
      <Alert color="danger" className="error-alert">
        {props.error}
      </Alert>
    );
  }
  return '';
};

const renderLoader = (props) => {
  if (props.isLoading) {
    return <Loader />;
  }
}

const Login = (props) => (
  <div id="login">
    <Container>
      <Row className="vh-100">
        <Col md={{ size: 10, offset: 1 }} className="my-auto position-relative">
          { renderError(props) }
          <Card className="p-2">
            <CardBody>
              <Row>
                <Col className="pr-5 border-right">
                  <LoginForm login={props.login} />
                  { renderLoader(props) }
                </Col>
                <Col className="pl-5">
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
