import React, { useContext, useState } from 'react';
import { Card, Form, Button, Col, Row, Badge } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const SalidaInvForm = ({ productos, handleRegistrarSalida }) => {
    // Contextos
    const { usuario } = useContext(AuthContext);

    const objForm = {
        tipoMovimiento: "2",
        idProducto: '',
        idUsuario: usuario.id,
        cant: ''
    }
    // Estados
    const [form, setForm] = useState(objForm);
    // Manejadores de Eventos
    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegistrarSalida(form);
        setForm(objForm);
    }

    return (
        <>
            <Card className="p-4 shadow p-3 mb-5 bg-body rounded">
                <Badge className="w-100" bg="dark">
                    <h6>Registrar Salida de Productos de Inventarios</h6>
                </Badge>
                <hr />
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <Form.Group className="mb-3" controlId="formGridTipo">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control defaultValue="2" onChange={handleForm} name="tipoMovimiento" type="text" disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridIdUsuario">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control value={usuario.id.toLocaleString("es-CO")} name="idUsuario" type="text" disabled />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formGridIdProducto">
                                <Form.Label>Id Producto</Form.Label>
                                <Form.Select value={form.idProducto} onChange={handleForm} name="idProducto" type="text" required>
                                    <option>Seleccione Producto</option>
                                    {productos.map(element => {
                                        return (
                                            <option key={element.idproducto} value={element.idproducto}>{element.idproducto}. {element.nombre_producto}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridIdCant">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control value={form.cant} onChange={handleForm} name="cant" type="number" placeholder="Ingrese la Cantidad" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="success" type="submit">
                        <FontAwesomeIcon icon={faAnglesRight} fixedWidth size="lg" color="white" />
                        Registrar
                    </Button>
                </Form>
            </Card>
        </>
    )
}

export default SalidaInvForm
