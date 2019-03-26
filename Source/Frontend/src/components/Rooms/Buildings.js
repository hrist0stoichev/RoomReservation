import React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Buildings.scss';

const Buildings = () => (
  <div>
    <Row>
      <Col>
        <p>Skaptopara 1</p>
        <ListGroup>
          <Link to="/rooms/view?sk=1&floor=1" className="f-item">
            <ListGroupItem>Floor 1</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=1&floor=2" className="f-item">
            <ListGroupItem>Floor 2</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=1&floor=3" className="f-item">
            <ListGroupItem>Floor 3</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=1&floor=4" className="f-item">
            <ListGroupItem>Floor 4</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=1&floor=5" className="f-item">
            <ListGroupItem>Floor 5</ListGroupItem>
          </Link>
        </ListGroup>
      </Col>
      <Col>
        <p>Skaptopara 2</p>
        <ListGroup>
          <Link to="/rooms/view?sk=2&floor=1" className="f-item">
            <ListGroupItem>Floor 1</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=2&floor=2" className="f-item">
            <ListGroupItem>Floor 2</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=2&floor=3" className="f-item">
            <ListGroupItem>Floor 3</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=2&floor=4" className="f-item">
            <ListGroupItem>Floor 4</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=2&floor=5" className="f-item">
            <ListGroupItem>Floor 5</ListGroupItem>
          </Link>
        </ListGroup>
      </Col>
      <Col>
        <p>Skaptopara 3</p>
        <ListGroup>
          <Link to="/rooms/view?sk=3&floor=1" className="f-item">
            <ListGroupItem>Floor 1</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=3&floor=2" className="f-item">
            <ListGroupItem>Floor 2</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=3&floor=3" className="f-item">
            <ListGroupItem>Floor 3</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=3&floor=4" className="f-item">
            <ListGroupItem>Floor 4</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=3&floor=5" className="f-item">
            <ListGroupItem>Floor 5</ListGroupItem>
          </Link>
          <Link to="/rooms/view?sk=3&floor=6" className="f-item">
            <ListGroupItem>Floor 6</ListGroupItem>
          </Link>
        </ListGroup>
      </Col>
    </Row>
  </div>
);

export default Buildings;
