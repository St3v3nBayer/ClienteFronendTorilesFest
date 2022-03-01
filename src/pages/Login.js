import React, { useContext, useState } from 'react';
import { Form, Button, Alert, Card, Row, Col, Badge, InputGroup, FormControl } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import signIn from '../assets/sign4.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faLock, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const Login = () => {
    const objForm = {
        idusuario: '',
        contraseña_usuario: ''
    }
    //Estados
    const [form, setForm] = useState(objForm);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("");
    //Contextos
    const { handleLogin, handleVerify } = useContext(AuthContext);
    //manejadores de eventos
    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(form).then(async (resp) => {
            let json = await resp.json();
            if (resp.status !== 200) {
                // console.log(json, "<>", resp)
                setMessage(json.message);
                setVariant("danger");
                setShow("true");
                setTimeout((() => { setShow(false) }), 3000)
            } else {
                handleVerify().then(resp => {
                    if (!resp.auth) {
                        console.log('error en credenciales!')
                    }
                }).catch(err => { console.error(err) })
            }
        }).catch((err) => {
            console.error(err);
        })
        setForm(objForm);
    }
    // className="container mt-5 pt-5 text-center shadow p-3 mb-5 bg-body rounded"style={{ width: '55rem', height: '30rem' }}
    return (
        <div className="container p-5 " >
            <Card className="shadow-lg p3 mb-5 bg-body rounded w-75 container">
                <Row>
                    <Col sm={7}>
                        <img src={signIn} className="img-fluid" alt="..." />
                    </Col>
                    <Col className="bg-secondary rounded" sm={5}>
                        <br />
                        <br />
                        <h4 id="sign" className="text-white ">BIENVENIDO</h4>
                        <hr />
                        <br />
                        <Form onSubmit={handleSubmit} className="container">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <FontAwesomeIcon icon={faUserTie} fixedWidth size="lg" color="#00B2FF" />
                                </InputGroup.Text>
                                <FormControl
                                    placeholder="Identificación"
                                    aria-label="Identificación"
                                    aria-describedby="basic-addon1"
                                    value={form.idusuario}
                                    onChange={handleForm}
                                    name="idusuario"
                                    type="number"
                                    required
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <FontAwesomeIcon icon={faLock} fixedWidth size="lg" color="#00B2FF" />
                                </InputGroup.Text>
                                <FormControl
                                    placeholder="Contraseña"
                                    aria-label="Contraseña"
                                    aria-describedby="basic-addon1"
                                    value={form.contraseña_usuario}
                                    onChange={handleForm}
                                    name="contraseña_usuario"
                                    type="password"
                                    required
                                />
                            </InputGroup>
                            {/* <Form.Group className="mb-3 " controlId="loginId">
                                <Form.Label></Form.Label>
                                <Form.Control value={form.idusuario} onChange={handleForm} name="idusuario" type="number" placeholder="Ingrese Id" required />
                            </Form.Group> */}
                            {/* <Form.Group className="mb-3" controlId="loginContraseña">
                                <Form.Label></Form.Label>
                                <Form.Control value={form.contraseña_usuario} onChange={handleForm} name="contraseña_usuario" type="password" placeholder="Ingrese Contraseña" required />
                            </Form.Group> */}
                            <br />
                            <Badge as={Button} className="w-100" bg="info" type="submit" >
                                <h6>LOGIN</h6>
                            </Badge>
                            <br />
                            <hr />
                            <Alert variant={variant} show={show}>
                                <FontAwesomeIcon icon={faSquareXmark} fixedWidth size="xl" color="#E60023" />
                                {" "}
                                <h7>{message}</h7>
                            </Alert>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default Login;
