import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';

export const LoggedHome = () => {
  return (
    <Container style={{height: '80vh'}}className="d-flex align-items-center justify-content-evenly flex-column">
      <Row >
        <Col>
          <img src="/images/credlylogo.png" alt="credly logo"/>
        </Col>
      </Row>
      <Row className="d-flex align-items-center justify-content-between">
        <Col>Making Rewards Easier than ever Before.</Col>
        <Col>Come Make a Difference with Credly Today.</Col>
      </Row>
    </Container>
  )
}
