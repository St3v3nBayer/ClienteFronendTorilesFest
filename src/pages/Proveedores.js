import { useContext, useEffect, useState } from 'react';
import ProveedoresModal from '../components/ProveedoresModal';
import ProveedoresTable from '../components/ProveedoresTable';
import ProContext from '../context/ProContext';
import { Alert } from 'react-bootstrap';

const objAlert = { message: '', variant: '' };
const objProv = { id: '', nombre: '', marca: '' };

const Proveedores = () => {
    // Estados
    const [proveedores, setProveedores] = useState([]);
    const [proveedorUpdate, setProveedorUpdate] = useState(objProv);
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(objAlert);
    const [createUpdate, setCreateUpdate] = useState("");
    // Contextos
    const { handleGetProv, handlePostProv, handlePutProv, handleDeleteProv } = useContext(ProContext);
    // Ciclos del Componente
    useEffect(() => {
        handleGetProveedores();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // Manejadores de Estado
    // Traer Proveedores de la Api
    const handleGetProveedores = () => {
        handleGetProv().then(async (resp) => {
            if (resp.status === 200) {
                let json = await resp.json();
                setProveedores(json);
            }
        }).catch(error => { throw error })
    }
    // Crear un Proveedor en la Api
    const handleCrearProveedor = (objProveedor) => {
        handlePostProv(objProveedor).then(async (resp) => {
            if (resp.status === 201) {
                handleGetProveedores();
                let json = await resp.json();
                setAlert({ message: json.message, variant: 'success' });
                setShowAlert(true);
                setTimeout(() => { setShowAlert(false); setAlert(objAlert) }, 3000);
            }
        }).catch(error => { throw error })
        setShow(false);
    }
    const handleShow = () => { setShow(true); setCreateUpdate('Crear') };
    const handleClose = () => setShow(false);
    // Actualizar un Proveedor en la Api
    const handleActualizarProveedor = (objProveedor) => {
        handlePutProv(objProveedor).then(async (resp) => {
            if (resp.status === 200) {
                handleGetProveedores();
                let json = await resp.json();
                setAlert({ message: json.message, variant: 'success' });
                setShowAlert(true);
                setTimeout(() => { setShowAlert(false); setAlert(objAlert) }, 3000);
            }
        }).catch(error => { throw error })
        setProveedorUpdate(objProv);
        setShow(false);
    }
    const handleCargarModal = (objProveedor) => {
        setProveedorUpdate({ id: objProveedor.idproveedor, nombre: objProveedor.nombre_proveedor, marca: objProveedor.marca_proveedor });
        setCreateUpdate('Actualizar');
        setShow(true)
    }
    // Eliminar un Proveedor de la Api
    const handleEliminarProveedor = (id) => {
        let mensajeEliminar = window.confirm(`¿Desea Eliminar Proveedor?`);
        if (mensajeEliminar) {
            handleDeleteProv({id: id}).then(async (resp) => {
                if (resp.status === 200) {
                    handleGetProveedores();
                    let json = await resp.json();
                    setAlert({ message: json.message, variant: 'danger' });
                    setShowAlert(true);
                    setTimeout(() => { setShowAlert(false); setAlert(objAlert) }, 3000);
                }
            }).catch(error => { throw error });
        }
    }

    return (
        <div className='container mt-4'>
            <ProveedoresModal handleActualizarProveedor={handleActualizarProveedor} proveedorUpdate={proveedorUpdate} createUpdate={createUpdate} show={show} handleShow={handleShow} handleClose={handleClose} handleCrearProveedor={handleCrearProveedor} />
            <Alert show={showAlert} variant={alert.variant}>{alert.message}</Alert>
            <ProveedoresTable handleEliminarProveedor={handleEliminarProveedor} proveedores={proveedores} handleCargarModal={handleCargarModal} />
        </div>
    )
}

export default Proveedores
