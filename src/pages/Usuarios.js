import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import UsuarioContext from '../context/UsuarioContext';

const objAlert = { message: '', variant: '', show: false };
const objUserUpdate = {
    idusuario: '',
    nombre_usuario: '',
    apellido_usuario: '',
    contraseña_usuario: '',
    telefono_usuario: '',
    correo_usuario: '',
    idrol_usuario: '',
    estado_usuario: ''
};

const Usuarios = () => {
    const navigate = useNavigate();

    // Estados
    const [usuarios, setUsuarios] = useState([]);
    const [alert, setAlert] = useState(objAlert);
    const [updateUser, setUpdateUser] = useState(objUserUpdate);
    const [variableCU, setVariableCU] = useState(0);
    // Contextos
    const { handleGetUsers, handlePostUsers, handlePutUser, handleDeleteUser } = useContext(UsuarioContext);
    // Ciclo de vida del componente
    useEffect(() => {
        handleTraerUsuarios();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // Manejadores de Eventos
    const handleTraerUsuarios = () => {
        handleGetUsers().then(async (res) => {
            if (res.status === 200) {
                let json = await res.json();
                setUsuarios(json);
            }
        }).catch(error => { throw error })
    }
    const handleCrearUsuario = (usuario) => {
        handlePostUsers(usuario).then(async (res) => {
            if (res.status === 201) {
                let json = await res.json()
                setUsuarios(json);
                setAlert({ message: 'Usuario Creado!', variant: 'success', show: true });
                setTimeout(() => { setAlert({ message: '', variant: '', show: false }) }, 3000);
            }
        }).catch(error => { throw error });
        navigate('/usuarios');
    }
    const handleBotonCrear = () => {
        setVariableCU(1);
    }
    const handleActualizarUsuario = (usuario) => {
        handlePutUser({ idusuario: usuario.idusuario, telefono_usuario: usuario.telefono_usuario, correo_usuario: usuario.correo_usuario, idrol_usuario: usuario.idrol_usuario, estado_usuario: usuario.estado_usuario }).then(async (resp) => {
            if (resp.status === 200) {
                let json = await resp.json();
                setUsuarios(json);
                setAlert({ message: 'Usuario Actualizado!', variant: 'success', show: true });
                setTimeout(() => { setAlert({ message: '', variant: '', show: false }) }, 3000);
            }
        }).catch(error => { throw error })
        navigate('/usuarios');
    }
    const handleUpdateUser = (usuario) => {
        setUpdateUser(usuario);
        setVariableCU(2);
        navigate('cuUsuario');
    }
    const handleEliminarUsuario = (id) => {
        let mensajeEliminar = window.confirm(`¿Desea Eliminar Usuario?`);
        if (mensajeEliminar) {
            handleDeleteUser({ idusuario: id }).then(async (resp) => {
                if (resp.status === 200) {
                    let json = await resp.json();
                    setUsuarios(json);
                    navigate('/usuarios');
                    setAlert({ variant: 'danger', show: true, message: "¡Usuario Eliminado!" });
                    setTimeout(() => {
                        setAlert(objAlert)
                    }, 3000);
                }
            }).catch(error => { throw error })
        }
    }

    const handleCancelUpdateCreateUser = () => {
        setUpdateUser(objUserUpdate);
        setVariableCU(0);
        navigate('/usuarios')
    }

    return (
        <>
            <br />
            <Alert show={alert.show} variant={alert.variant}>
                {alert.message}
            </Alert>
            <Outlet context={{ usuarios, handleCrearUsuario, handleCancelUpdateCreateUser, updateUser, handleUpdateUser, handleBotonCrear, variableCU, handleActualizarUsuario, handleEliminarUsuario }} />
        </>
    )
}

export default Usuarios
