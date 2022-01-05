import React, {useEffect, useState} from 'react';
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';
import { ToastContainer } from "react-toastr";

let container;

const config_auth = {
  auth: {
    username: 'pruebafront@payco.co',
    password: 'pruebafront$2020'
  }
};

const config_token = {
  headers: {
    //'Authorization': `Basic ${token}` 
  }
};


function Home() {

  const navigate  = useNavigate();

  const [token_global, setToken] = useState("")
  const [api_config, setApiConfig] = useState([])
  const [documents, setDocuments] = useState({})
  const [document_num, setDocumentNum] = useState("")
  const [err, setErr] = useState({
    error_documentos: null,
  })

  const [invoice, setIvoice] = useState({})


  async function get_token() {

    const respuesta = await axios.post('https://apify.epayco.co/login/mail', {}, config_auth).then(res => { 
        return res
      })
  
    return respuesta
  }
  
  async function get_config(res) {
  
    const {token} = res
    setToken(token)
    const respuesta = await axios.post('https://apify.epayco.co//billcollect/proyect/config/consult', {"projectId":29}, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }).then(res => {

      console.log("Aqui es donde estoy probando")
      console.log(res)
      setApiConfig([...api_config, res.data.data], [])

      return res

    }).catch(err => {return 'err: ' + err})
  
    if(respuesta == null){
      return console.log('a ocurrido un Error')
    }
  
    if(respuesta.data != null && !respuesta.data.success){
      return console.log('Error en la Configuracion de la API')
    }
    
    respuesta.data.data.map(data => {

      if(data.key == "document") setDocuments(data)
    })

    return respuesta
  }

  async function get_documents(number) {

    const respuesta = await axios.post('https://apify.epayco.co//billcollect/invoices/consult', {"projectId":29, "document":number}, {
      headers: {
        'Authorization': `Bearer ${token_global}` 
      }
    }).then(res => {

      console.log("Aqui es donde estoy probando numero de documentos")
      console.log(res)
      //setApiConfig([...api_config, res.data.data], [])

      return res

    }).catch(err => {return 'err: ' + err})

    
    if(respuesta != null) {
      
      if(respuesta.data != null) {

        if(respuesta.data.success) {

          setIvoice(respuesta.data.data)

          let path = `/about`; 
          return navigate(path, {state:respuesta.data.data});
        
        } else {
          setIvoice({
            descriptionFirst: "12",
            billId: "123456",
            amountFirst: 50000,
            pendingAmount: null,
            expirationDateFirst: 4079998799,
            document:"123456",
            billDate: "2021-04-15 00:00:00",
            additionalFirst: "123"
        
          })

          let path = `/about`; 
          
          if(number == '123456') {

            return navigate(path, {state:[{
              descriptionFirst: "12",
              billId: "123456",
              amountFirst: 10000,
              pendingAmount: null,
              expirationDateFirst: 4079998799,
              document:"123456",
              billDate: "2021-04-15 00:00:00",
              additionalFirst: "123"
            }]});
          }

          if(number == '123456789') {

            return navigate(path, {state:[
              {
                descriptionFirst: "12",
                billId: "123456",
                amountFirst: 10000,
                pendingAmount: null,
                expirationDateFirst: 4079998799,
                document:"123456",
                billDate: "2021-04-15 00:00:00",
                additionalFirst: "123"
              },
              {
                descriptionFirst: "12700",
                billId: "1234567890",
                amountFirst: 50000,
                pendingAmount: null,
                expirationDateFirst: 4079998799,
                document:"123456",
                billDate: "2021-08-29 00:00:00",
                additionalFirst: "546"
              },

            
            ]});
          }

          alert("El Numero de documento no se Encuentra asignado por favor intentar con 123456 o 123456789")

        }

      }
    }
  }

  const handler_num_document = (event) => {
    console.log(event.target.name)
    console.log(token_global)

    setDocumentNum(event.target.value)

    console.log(document_num)
    //get_documents(event.target.value)
  }

  const get_Invoices = async () => {


    if(document_num == null || document_num == "" || document_num[0] == " " || document_num.length < 6) {

      alert("El Campo es obligatorio y debe ser igual o mayor de 6 caracteres")
      return
    }

    await get_documents(document_num)

    
    
  }

  useEffect( async () => {

    let res = await get_token()

    if(res == null){
      return console.log('a ocurrido un Error')
    }

    if(res.status !== 200){
      return console.log('a ocurrido un Error con el status : '+ res.status)
    }

    await get_config(res.data)

  }, [])

  return (
    <Container fluid>
      <Row>
        <Col ></Col>
        <Col>
        <ToastContainer
        ref={ref => container = ref}
        className="toast-top-right"
      />
          <Card >
            <Card.Body>
              <Card.Title className="mb-3">Ingrese sus Datos</Card.Title>
              <Card.Subtitle className="mb-3 text-muted"><small>Consulte sus facturas</small></Card.Subtitle>
              <Card.Text>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <FormControl
                    placeholder={documents.name}
                    aria-label="document"
                    aria-describedby="basic-addon1"
                    name="document"
                    onChange={handler_num_document}

                  />
                </InputGroup>
              </Card.Text>
              <Card.Link onClick={get_Invoices} className='btn btn-dark' href="#">Continuar</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Home