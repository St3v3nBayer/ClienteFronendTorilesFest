import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { useOutletContext, Link } from 'react-router-dom';
import avatar from '../assets/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faRetweet, faTrashCan, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const UsuariosTable = () => {

    const { usuarios, handleUpdateUser, handleBotonCrear, handleEliminarUsuario } = useOutletContext();

    return (
        <div className="m-3">
            <Button className="m-3" as={Link} to="cuUsuario" onClick={handleBotonCrear} variant="success">
                <FontAwesomeIcon icon={faUserPlus} fixedWidth size="2x" color="white" />
                <h6>Crear Usuario</h6>
            </Button>
            <Button className="m-3" as={Link} to="usuarioCard" variant="primary">
                <FontAwesomeIcon icon={faAnglesRight} fixedWidth size="2x" color="white" />
                <h6>Cards Usuarios</h6>
            </Button>
            <Badge className="w-100" pill bg="dark">
                <h4>Usuarios</h4>
            </Badge>
            <hr />
            <Table responsive striped bordered hover >
                <thead>
                    <tr className="table-dark">
                        <th>Avatar</th>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        {/* <th>Contraseña</th> */}
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => {
                        return (
                            <tr key={usuario.idusuario}>
                                <td className="justify-content-center">
                                    <img
                                        src={avatar} alt=''
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top img-fluid rounded-circle "
                                    />
                                </td>
                                <td>{usuario.idusuario}</td>
                                <td>{usuario.nombre_usuario}</td>
                                <td>{usuario.apellido_usuario}</td>
                                {/* <td>{usuario.contraseña_usuario}</td> */}
                                <td>{usuario.telefono_usuario}</td>
                                <td>{usuario.correo_usuario}</td>
                                <td>{usuario.descripcion_rol}</td>
                                <td>{usuario.estado_usuario}</td>
                                <td>
                                    <Button variant="warning" onClick={() => { handleUpdateUser(usuario) }}>
                                        <FontAwesomeIcon icon={faRetweet} fixedWidth size="lg" color="white" />
                                    </Button>
                                    {" "}
                                    <Button variant="danger" onClick={() => { handleEliminarUsuario(usuario.idusuario) }}>
                                        <FontAwesomeIcon icon={faTrashCan} fixedWidth size="lg" color="white" />
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default UsuariosTable
