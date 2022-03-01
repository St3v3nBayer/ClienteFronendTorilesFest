import { useState, useEffect } from 'react'
import { Table, Form, Button, FormControl, Row, Col, Container, Badge } from 'react-bootstrap';
import { Link, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faTrashCan, faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const TablaProductos = () => {

    const { productos, usuario, handleEditar, handleBotonCrear, handleEliminarProducto } = useOutletContext();

    const [prod, setProd] = useState([]);
    const [copiaProd, setCopiaProd] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        setProd(productos);
        setCopiaProd(productos);
    }, [productos])


    const handleChange = (e) => {
        setBusqueda(e.target.value)
        filtrar(e.target.value)
    }

    const filtrar = (buscar) => {
        let resultados = copiaProd.filter((element) => {
            if (element.nombre_producto.toString().toLowerCase().includes(buscar.toLowerCase()) || element.idproducto.toString().toLowerCase().includes(buscar.toLowerCase())) {
                return element
            }
            return "";
        })
        setProd(resultados);
    }

    return (
        <>
            <Row>
                {(() => {
                    if (usuario.rol === 2) {
                        return (
                            <Col sm={4}>
                                <Button as={Link} to="cuProducto" onClick={handleBotonCrear} size="sm" variant="success">
                                    <FontAwesomeIcon icon={faCirclePlus} fixedWidth size="2x" color="white" />
                                    <h6>Crear Producto</h6>
                                </Button>
                            </Col>
                        )
                    }
                })()}
                <Col sm={8}>
                    <Form className="d-flex">
                        <FormControl
                            value={busqueda}
                            onChange={handleChange}
                            type="search"
                            placeholder="Buscar por nombre o id de producto..."
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="primary">
                            <FontAwesomeIcon icon={faMagnifyingGlass} fixedWidth size="1x" color="white" />
                        </Button>
                    </Form>
                </Col>
            </Row>
            <br />
            <Container>
                <Badge className="w-100" pill bg="dark">
                    <h4>Productos</h4>
                </Badge>
                <hr />
                <Table responsive striped bordered hover size="sm">
                    <thead>
                        <tr className="table-dark">
                            <th>Id</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Categotía</th>
                            <th>Marca</th>
                            <th>Proveedor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prod.map((producto) => {
                            return (
                                <tr key={producto.idproducto}>
                                    <td>{producto.idproducto}</td>
                                    <td>{producto.nombre_producto}</td>
                                    <td>{producto.precio_producto.toLocaleString("es-CO")}</td>
                                    <td>{producto.descripcion_categoria}</td>
                                    <td>{producto.marca_proveedor}</td>
                                    <td>{producto.nombre_proveedor}</td>
                                    <td>
                                        {(() => {
                                            if (usuario.rol === 1) {
                                                return (
                                                    <Button onClick={() => { handleEliminarProducto(producto.idproducto) }} variant="danger" size="sm">
                                                        <FontAwesomeIcon icon={faTrashCan} fixedWidth size="lg" color="white" />
                                                    </Button>
                                                )
                                            } else if (usuario.rol === 2) {
                                                return (
                                                    <Button onClick={() => { handleEditar(producto) }} size="sm" variant="warning">
                                                        <FontAwesomeIcon icon={faRetweet} fixedWidth size="lg" color="white" />
                                                    </Button>
                                                )
                                            }
                                        })()}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default TablaProductos;
