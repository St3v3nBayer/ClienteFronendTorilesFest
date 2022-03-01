import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const objForm = { id: '', nombre: '', marca: '' }

const ProveedoresModal = ({ handleActualizarProveedor, proveedorUpdate, createUpdate, handleShow, show, handleClose, handleCrearProveedor }) => {
    /// Estados
    const [form, setForm] = useState(objForm);
    // Ciclo de vida del Componente
    useEffect(() => {
        setForm(proveedorUpdate);
    }, [proveedorUpdate])
    // Manejadores de Eventos
    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = () => {
        handleCrearProveedor(form);
        setForm(objForm);
    }
    const handleCancelar = () => {
        handleClose();
        setForm(objForm);
    }
    const handleEnviarUpdate = () => {
        if (form.id === "" || form.marca === "" || form.nombre === "") {
            alert('Ingresar Todos Los Datos')
        } else {
            handleActualizarProveedor(form);
        }
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                <FontAwesomeIcon icon={faAnglesRight} fixedWidth size="2x" color="white" />
                <h6>Crear Proveedor</h6>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Proveedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Id</Form.Label>
                            <Form.Control value={form.id} onChange={handleForm} name="id" type="number" disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control value={form.nombre} onChange={handleForm} name="nombre" type="text" placeholder='Ingrese Nombre del Proveedor' required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control value={form.marca} onChange={handleForm} name="marca" type="text" placeholder='Ingrese La Marca Asociada' required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {(() => {
                        if (createUpdate === 'Crear') {
                            return <Button variant="success" onClick={handleSubmit}>Crear</Button>
                        }
                        else if (createUpdate === 'Actualizar') {
                            return <Button variant="success" onClick={handleEnviarUpdate}>Actualizar</Button>
                        }
                    })()}
                    <Button variant="dark" onClick={handleCancelar}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProveedoresModal
