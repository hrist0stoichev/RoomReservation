import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import SecondaryNav from './SecondaryNav';

const MainLayout = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <SecondaryNav links={props.secondaryNav} title={props.title} />
        </Col>
      </Row>
      <Row>
        <Col>
          {props.children}
        </Col>
      </Row>
    </Container>
  )
}

export default MainLayout;
