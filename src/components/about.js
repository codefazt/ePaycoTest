import React, {useEffect, useState} from 'react';
//import ReactDOM from 'react-dom';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button, Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';
import moment from 'moment'

function About(props) {

  const navigate  = useNavigate();
  const data = useLocation();
  const {state} = data

  const format_date = (date) => {

    return moment(date).format('MMMM Do YYYY')
  }

  const pagar = (data) => {

    let path = `/recibo`; 

    navigate(path, {state:data});
  }

  console.log(state)
    return (
      <Container fluid>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Card >
            <Card.Body>
              <Card.Title className="mb-3 text-muted"><small>Listado de Facturas</small></Card.Title>
              <Card.Text className="">
                <Card>
                  <Card.Text className="">
                    {state.map((data,index) => {
                      {
                        return (
                        <Row key={index} className="mt-3 mb-3">
                          <Col md={3}><strong>Valor</strong> <br/> $ {data.amountFirst} COP</Col>
                          <Col md={3}><strong>Número factura</strong> <br/> NF-{data.billId}</Col>
                          <Col md={3}><strong>Fecha vencimiento</strong> <br/> {format_date(data.billDate)}</Col>
                          <Col md={3}><Button onClick={x => pagar(data)} size="lg" >Pagar</Button></Col>
                        </Row>
                        )
                      }
                    })}
                  </Card.Text>
                </Card>
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

export default About