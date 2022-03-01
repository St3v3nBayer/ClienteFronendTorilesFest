import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import ProContext from '../context/ProContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faRetweet, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

const objForm = {
    id: '',
    nombre: '',
    precio: '',
    categoria: '',
    proveedor: ''
}
const objAlert = { variant: '', show: false, message: '' }

const ProductoForm = () => {

    // Estados
    const [form, setForm] = useState(objForm);
    const [proveedor, setProveedor] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [alert, setAlert] = useState(objAlert);
    // Contextos
    const { handleGetCategorias } = useContext(GlobalContext);
    const { handleGetProv } = useContext(ProContext);
    const { prodUpdate, handleCrearProducto, handleCancelarPost, cuProd, handleActualizarProducto } = useOutletContext();
    // Inicializacion del componente
    useEffect(() => {
        handleGetCategorias().then(resp => {
            setCategoria(resp);
        }).catch(error => { throw error })
        handleGetProv().then(async (resp) => {
            if (resp.status === 200) {
                let json = await resp.json();
                setProveedor(json);
            }
        }).catch(error => { throw error })
        setForm(prodUpdate);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // Manejador de Estados
    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.nombre === '' || form.precio === '' || form.categoria === '' || form.proveedor === '') {
            setAlert({ variant: 'warning', message: '¡Informacion Incompleta!', show: true });
            setTimeout(() => { setAlert(objAlert) }, 3000)
        } else {
            handleCrearProducto(form);
        }
    }

    return (
        <div className="container w-50 pt-5">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="crearProductNombre">
                            <Form.Label>Nombre del Producto</Form.Label>
                            <Form.Control value={form.nombre} onChange={handleForm} name="nombre" type="text" placeholder="Ingrese la Descripción del Producto" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <Form.Group className="mb-3" controlId="crearProductPrecio">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control value={form.precio} onChange={handleForm} name="precio" type="number" placeholder="Ingrese Precio" required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="crearProductId">
                            <Form.Label>Id</Form.Label>
                            <Form.Control value={form.id} onChange={handleForm} name="id" type="number" disabled />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="crearProductCategoria">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select value={form.categoria} onChange={handleForm} name="categoria" required>
                                <option>Seleccione Categoría</option>
                                {categoria.map(element => {
                                    return (
                                        <option key={element.idcategoria} value={element.idcategoria}>{element.descripcion_categoria}</option>
                                    )
                                })}

                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="crearProductProveedor">
                            <Form.Label>Proveedor</Form.Label>
                            <Form.Select value={form.proveedor} onChange={handleForm} name="proveedor" required>
                                <option>Seleccione Provedor</option>
                                {proveedor.map(element => {
                                    return (
                                        <option key={element.idproveedor} value={element.idproveedor}>{element.nombre_proveedor}</option>
                                    )
                                })}

                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        {(() => {
                            if (cuProd === 1) {
                                return (
                                    <Button variant="success" type="submit">
                                        <FontAwesomeIcon icon={faCartPlus} size="lg" fixedWidth color="white" />
                                        <h6>Crear Producto</h6>
                                    </Button>
                                )
                            }
                            else if (cuProd === 2) {
                                return (
                                    <Button onClick={() => { handleActualizarProducto(form) }} variant="success">
                                        <FontAwesomeIcon icon={faRetweet} size="lg" fixedWidth color="white" />
                                        <h6>Actualizar Producto</h6>
                                    </Button>
                                )
                            }
                        })()}
                    </Col>
                    <Col>
                        <Button onClick={handleCancelarPost} variant="dark">
                            <FontAwesomeIcon icon={faRotateLeft} size="lg" fixedWidth color="white" />
                            <h6>Cancelar</h6>
                        </Button>
                    </Col>
                </Row>
                <br />
                <br />
                <Alert show={alert.show} variant={alert.variant}>
                    {alert.message}
                </Alert>
            </Form>
        </div>
    )
}

export default ProductoForm;