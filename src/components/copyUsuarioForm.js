import { useContext, useEffect, useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import UsuarioContext from '../context/UsuarioContext';

const objForm = {
    idusuario: '',
    nombre_usuario: '',
    apellido_usuario: '',
    contraseña_usuario: '',
    telefono_usuario: '',
    correo_usuario: '',
    idrol_usuario: '',
    estado_usuario: ''
}
const objAlert = { variant: '', show: false, message: '' };

const UsuariosForm = () => {
    // Estados
    const [roles, setRoles] = useState([]);
    const [form, setForm] = useState(objForm);
    const [alert, setAlert] = useState(objAlert);
    // Contextos
    const { handleTipoUser } = useContext(UsuarioContext);
    const { handleCrearUsuario, handleCancelUpdateCreateUser, updateUser, variableCU, handleActualizarUsuario } = useOutletContext();
    //Ciclo de vida del Componente
    useEffect(() => {
        handleTipoUser().then(async (resp) => {
            if (resp.status === 200) {
                let json = await resp.json();
                setRoles(json);
            }
        }).catch(error => { throw error });
        setForm(updateUser);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //Manejadores de Eventos 
    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        if (form.nombre_usuario === '' || form.apellido_usuario === '' || form.contraseña_usuario === '' || form.correo_usuario === '' || form.telefono_usuario === '' || form.idrol_usuario === '' || form.idusuario === '' || form.estado_usuario === '') {
            setAlert({ variant: 'warning', message: '¡Informacion Incompleta!', show: true });
            setTimeout(() => { setAlert(objAlert) }, 3000)
        } else {
            handleCrearUsuario(form);
            setForm(objForm);
        }
    }
    // console.log(updateUser);

    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Label>Identificación</Form.Label>
                            {(() => {
                                if (variableCU === 1) {
                                    return <Form.Control value={form.idusuario} onChange={handleForm} name="idusuario" type="number" placeholder="Ingrese ID" required />
                                } else {
                                    return <Form.Control value={form.idusuario} onChange={handleForm} name="idusuario" type="number" placeholder="Ingrese ID" disabled />
                                }
                            })()}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicRol">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select value={form.idrol_usuario} onChange={handleForm} name="idrol_usuario" type="text" required>
                                <option>Seleccione Rol</option>
                                {roles.map(e => {
                                    return <option key={e.idrol} value={e.idrol}>{e.descripcion_rol}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicNombre">
                            <Form.Label>Nombre</Form.Label>
                            {(() => {
                                if (variableCU === 1) {
                                    return <Form.Control value={form.nombre_usuario} onChange={handleForm} name="nombre_usuario" type="text" placeholder="Ingrese Nombre de Usuario" required />
                                } else {
                                    return <Form.Control value={form.nombre_usuario} onChange={handleForm} name="nombre_usuario" type="text" placeholder="Ingrese Nombre de Usuario" disabled />
                                }
                            })()}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicApellido">
                            <Form.Label>Apellido</Form.Label>
                            {(() => {
                                if (variableCU === 1) {
                                    return <Form.Control value={form.apellido_usuario} onChange={handleForm} name="apellido_usuario" type="text" placeholder="Ingrese Apellido de Usuario" required />
                                } else {
                                    return <Form.Control value={form.apellido_usuario} onChange={handleForm} name="apellido_usuario" type="text" placeholder="Ingrese Apellido de Usuario" disabled />
                                }
                            })()}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicTelefono">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control value={form.telefono_usuario} onChange={handleForm} name="telefono_usuario" type="number" placeholder="Ingrese Teléfono" required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicCorreo">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control value={form.correo_usuario} onChange={handleForm} name="correo_usuario" type="email" placeholder="Ingrese Correo Electronico" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    {(() => {
                        if (variableCU === 1) {
                            return (
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicContraseña">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control value={form.contraseña_usuario} onChange={handleForm} name="contraseña_usuario" type="password" placeholder="Ingrese Contraseña" required />
                                    </Form.Group>
                                </Col>
                            )
                        }
                    })()}
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEstado">
                            <Form.Label>Estado</Form.Label>
                            <Form.Select value={form.estado_usuario} onChange={handleForm} name="estado_usuario" type="text" required>
                                <option>Seleccione Estado</option>
                                <option value="Activado">Activado</option>
                                <option value="Desactivado">Desactivado</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                {(() => {
                    if (variableCU === 1) {
                        return (
                            <Button variant="dark" type="submit">
                                Crear
                            </Button>
                        )
                    } else {
                        return (
                            <Button onClick={()=>{handleActualizarUsuario(form)}} variant="dark">
                                Actualizar
                            </Button>
                        )
                    }
                })()}
                {" "}
                <Button variant="secondary" onClick={handleCancelUpdateCreateUser}>
                    Cancelar
                </Button>
                <br />
                <br />
                <Alert show={alert.show} variant={alert.variant}>
                    {alert.message}
                </Alert>
            </Form>
        </div>
    )
}

export default UsuariosForm
