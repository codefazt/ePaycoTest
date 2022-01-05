import React from 'react';
//import ReactDOM from 'react-dom';
import { Link, useLocation } from "react-router-dom";
//import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import moment from 'moment'

function Recibo(props) {

  const format_date = (date) => {

    return moment(date).format('MMMM Do YYYY')
  }

  const data = useLocation();
  
  const {state} = data
  console.log(state)
    return (
      <Container fluid>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Card >
            <Card.Body>
              <Card.Title className="mb-3 text-muted"><small>Recibo</small></Card.Title>
              <Card.Text className="">
                <ListGroup as="ol" numbered>
                  <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Código empresa</div>
                    </div>
                    <small className="text-muted">{state.additionalFirst}</small>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Fecha vencimiento</div>
                    </div>
                    <small className="text-muted">{format_date(state.billDate)}</small>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Fecha de facturación</div>
                    </div>
                    <small className="text-muted">{format_date(state.expirationDateFirst)}</small>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Número de identificación del usuario</div>
                    </div>
                    <small className="text-muted">{state.document}</small>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Número factura</div>
                    </div>
                    <small className="text-muted">{state.billId}</small>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Periodos facturados</div>
                    </div>
                    <small className="text-muted">{state.descriptionFirst}</small>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Valor</div>
                    </div>
                    <small className="text-muted">{state.amountFirst}</small>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Text>
              <Card.Link href="#"><Link to="/" className="btn btn-dark" >Regresar</Link></Card.Link>
            </Card.Body>
          </Card>

        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
    );
  }

export default Recibo