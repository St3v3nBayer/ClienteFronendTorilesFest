import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ProContext from '../context/ProContext';
import { Alert } from 'react-bootstrap';

const objAlert = { variant: '', show: false, message: '' }

const Productos = () => {
    const navigate = new useNavigate();

    // Estados
    const [productos, setProductos] = useState([]);
    const [alertProd, setAlertProd] = useState(objAlert);
    const [prodUpdate, setProdUpdate] = useState({ id: '', nombre: '', precio: '', categoria: '', proveedor: '' });
    const [cuProd, setcuProd] = useState(0);
    // Contextos
    const { usuario } = useContext(AuthContext);
    const { handleGetProd, handlePostProd, handlePutProd, handleDeleteProd } = useContext(ProContext);
    // Ciclos del Componente
    useEffect(() => {
        handleGetProductos();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // Manejadores de Estado
    ////// Traer Productos de la api ///////
    const handleGetProductos = () => {
        handleGetProd().then(async (resp) => {
            if (resp.status === 200) {
                let json = await resp.json();
                setProductos(json);
            }
        }).catch(error => { throw error })
    }
    ////// Crear Productos a la api ///////
    const handleCrearProducto = (objProducto) => {
        handlePostProd(objProducto).then(async (resp) => {
            if (resp.status === 200) {
                let json = await resp.json();
                setProductos(json);
                navigate('/productos');
                setAlertProd({ variant: 'success', show: true, message: "¡Producto Creado!" });
                setTimeout(() => {
                    setAlertProd(objAlert)
                }, 3000);
            }
        }).catch(error => { throw error })
    }
    const handleBotonCrear = () => {
        setcuProd(1);
    }
    ////// Cancelar Peticion crear Producto///////
    const handleCancelarPost = () => {
        setProdUpdate({ id: '', nombre: '', precio: '', categoria: '', proveedor: '' });
        navigate('/productos');
    }
    ////// Actualizar Productos de la api ///////
    const handleActualizarProducto = (objProducto) => {
        handlePutProd(objProducto).then(async (resp) => {
            if (resp.status === 200) {
                let json = await resp.json();
                setProductos(json);
                navigate('/productos');
                setAlertProd({ variant: 'success', show: true, message: "¡Producto Actualizado!" });
                setTimeout(() => {
                    setAlertProd(objAlert)
                }, 3000);
            }
        }).catch(error => { throw error })
    }
    const handleEditar = (objProducto) => {
        setProdUpdate({ id: objProducto.idproducto, nombre: objProducto.nombre_producto, precio: objProducto.precio_producto, categoria: objProducto.idcategoria, proveedor: objProducto.idproveedor })
        setcuProd(2);
        navigate('cuProducto');
    }
    ////// ELiminar Productos de la api ///////
    const handleEliminarProducto = (id) => {
        let mensajeEliminar = window.confirm(`¿Desea Eliminar Producto?`);
        if (mensajeEliminar) {
            handleDeleteProd({ id: id }).then(async (resp) => {
                if (resp.status === 200) {
                    let json = await resp.json();
                    setProductos(json);
                    navigate('/productos');
                    setAlertProd({ variant: 'danger', show: true, message: "¡Producto Eliminado!" });
                    setTimeout(() => {
                        setAlertProd(objAlert)
                    }, 3000);
                }
            }).catch(error => { throw error });
        }
    }

    return (
        <div className='container mt-5'>
            <Alert show={alertProd.show} variant={alertProd.variant}>
                {alertProd.message}
            </Alert>
            <Outlet context={{ productos, usuario, prodUpdate, cuProd, handleEliminarProducto, handleActualizarProducto, handleBotonCrear, handleCrearProducto, handleCancelarPost, handleEditar }} />
        </div>
    )
}

export default Productos
