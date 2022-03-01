import React, { useState } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const objCategoria = { descripcion: "" };

const CatModal = ({ handleAddCat }) => {

    const [show, setShow] = useState(false);
    const [categoria, setCategoria] = useState(objCategoria);

    const handleClose = () => { setShow(false); setCategoria(objCategoria) };
    const handleShow = () => setShow(true);
    const handleForm = (e) => {
        setCategoria({ descripcion: e.target.value })
    }
    const handleSubmit = () => {
        if (categoria.descripcion === "" || categoria.descripcion === undefined || categoria.descripcion === null) {
            alert('Ingresar Datos')
        } else {
            handleAddCat(categoria);
            setCategoria(objCategoria);
            setShow(false);
        }
    }

    return (
        <>
            <Card className="p-4">
                <Button variant="success" onClick={handleShow} size="sm">
                    <FontAwesomeIcon icon={faAnglesRight} fixedWidth size="lg" color="white" />
                    {" "}
                    <h6>Crear Categoría</h6>
                </Button>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="loginId">
                            <Form.Control value={categoria.descripcion} onChange={handleForm} name="descripcion" type="text" placeholder="Ingrese Categoría" required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="success" onClick={handleSubmit}>
                        Crear
                    </Button>
                    <Button variant="dark" onClick={handleClose}>                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CatModal
