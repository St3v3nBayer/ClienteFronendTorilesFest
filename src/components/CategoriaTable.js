import { useState } from 'react';
import { Table, Button, Modal, Form, Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const objCategoria = { id: "", descripcion: "" };

const CategoriaTable = ({ categorias, handleActualizarCat, handleEliminarCat }) => {
    // ESTADOS
    const [show, setShow] = useState(false);
    const [categoria, setCategoria] = useState(objCategoria);
    // MANEJADORES DE EVENTOS
    const handleClose = () => { setShow(false); setCategoria(objCategoria) };
    const handleForm = (e) => {
        setCategoria({ ...categoria, [e.target.name]: e.target.value })
    }
    // console.log(categoria);
    const cargarModal = (cat) => {
        setCategoria({ id: cat.idcategoria, descripcion: cat.descripcion_categoria });
        setShow(true);
    }
    const handleSubmit = () => {
        if (categoria.descripcion === "" || categoria.descripcion === undefined || categoria.descripcion === null) {
            alert('Ingresar Datos')
        } else {
            handleActualizarCat(categoria)
            setCategoria(objCategoria);
            setShow(false);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Id</Form.Label>
                            <Form.Control value={categoria.id} onChange={handleForm} name="id" type="number" disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control value={categoria.descripcion} onChange={handleForm} name="descripcion" type="text" required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="success" onClick={handleSubmit}>
                        Actualizar
                    </Button>
                    <Button variant="dark" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card className="p-3">
                <Badge className="w-100" pill bg="dark">
                    <h4>Categorías</h4>
                </Badge>
                <hr />
                <Table responsive striped bordered hover size="sm">
                    <thead>
                        <tr className="table-dark">
                            <th>Id</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => {
                            return (
                                <tr key={categoria.idcategoria}>
                                    <td>{categoria.idcategoria}</td>
                                    <td>{categoria.descripcion_categoria}</td>
                                    <td>
                                        <Button onClick={() => { cargarModal(categoria) }} variant="warning" size="sm">
                                            <FontAwesomeIcon icon={faRetweet} fixedWidth size="lg" color="white" />
                                        </Button>
                                        {" "}
                                        <Button onClick={() => { handleEliminarCat(categoria) }} variant="danger" size="sm">
                                            <FontAwesomeIcon icon={faTrashCan} fixedWidth size="lg" color="white" />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

export default CategoriaTable;