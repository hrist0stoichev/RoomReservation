import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import './SecondaryNav.scss';

const SecondaryNav = (props) => {
  return (
    <div id="secondary-nav" className="border-bottom">
      <Row>
        <Col md="3">
          <p>{props.title}</p>
        </Col>
        <Col md="9" className="text-right">
          <ul>
            {props.links.map((link, index) => <Link to={link.href}><li key={index}>{link.title}</li></Link>)}
          </ul>
        </Col>
      </Row>
    </div>
  )
}

export default SecondaryNav;
