import { useState } from 'react';
import { Form, Button, Alert, Col, Row, Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';


const IngresarInvForm = ({ usuario, prod, handleIngresarProdInv }) => {
    const objForm = {
        tipoMovimiento: "1",
        idProducto: '',
        idUsuario: usuario.id,
        cant: ''
    }
    //Estados
    const [form, setForm] = useState(objForm);
    const [show, setShow] = useState(false);

    // Manejadores de estados
    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let result = prod.filter((element) => {
            if (element.idproducto === parseInt(form.idProducto)) {
                return element;
            }
            return "";
        })
        if (result.length === 1) {
            handleIngresarProdInv(form);
            setForm(objForm);
        } else {
            setShow(true);
            setTimeout(() => { setShow(false) }, 3000);
        }
    }

    return (
        <div className="container mt-5">
            <Card className="p-4 shadow p-3 mb-5 bg-body rounded">
                <Badge className="w-100" bg="dark">
                    <h6>Ingresar Productos a Stock</h6>
                </Badge>
                <hr />
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <Form.Group className="mb-3" controlId="formGridTipo">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control defaultValue="1" onChange={handleForm} name="tipoMovimiento" type="text" disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridIdUsuario">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control value={usuario.id.toLocaleString("es-CO")} name="idUsuario" type="text" disabled />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formGridIdProducto">
                                <Form.Label>Id Producto</Form.Label>
                                <Form.Control value={form.idProducto} onChange={handleForm} name="idProducto" type="text" placeholder="Ingrese Id del producto" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridIdCant">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control value={form.cant} onChange={handleForm} name="cant" type="number" placeholder="Ingrese la Cantidad" required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="success" type="submit">
                        <FontAwesomeIcon icon={faAnglesRight} fixedWidth size="lg" color="white" />
                        Registrar
                    </Button>
                </Form>
                <Alert show={show} variant="warning">
                    Error en Producto o  No existe!
                </Alert>
            </Card>
        </div>
    )
}

export default IngresarInvForm
