import React, { useContext, useState, useEffect } from 'react';
import MovimientosTable from '../components/MovimientosTable';
import SalidaInvForm from '../components/SalidaInvForm';
import GlobalContext from '../context/GlobalContext';
import ProContext from '../context/ProContext';
import { Row, Col, Alert } from 'react-bootstrap';

const SalidaInventarios = () => {
    // Estados
    const [movimientos, setMovimientos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [show, setShow] = useState(false);
    // Contextos
    const { handleGetProd } = useContext(ProContext);
    const { handleGetMov, handlePostMov } = useContext(GlobalContext);
    //Ciclo de vida del componente
    useEffect(() => {
        handleTraerSalidas();
        handleTraerProductos();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // Manjadores de Eventos
    const handleTraerSalidas = () => {
        handleGetMov().then(async (resp) => {
            if (resp.status === 200) {
                let json = await resp.json();
                let newJson = json.filter(element => element.tipo === "Salida");
                let nuevoJson = newJson.map((e) => {
                    let newFecha = (e.fecha_movimiento.split("T"));
                    let fecha = newFecha[0].replace(/-/g, "/");
                    e.fecha_movimiento = fecha;
                    return e;
                })
                setMovimientos(nuevoJson);
            }
        }).catch(error => { throw error })
    }
    const handleTraerProductos = () => {
        handleGetProd()
            .then(resp => resp.json())
            .then(data => setProductos(data))
            .catch(error => { throw error })
    }
    const handleRegistrarSalida = (salida) => {
        handlePostMov(salida).then(resp => {
            if (resp.status === 201) {
                handleTraerSalidas();
                setShow(true);
                setTimeout(() => { setShow(false) }, 3000);
            }
        }).catch(error => { throw error })
    }

    return (
        <div className='container mt-5'>
            <Row>
                <Col>
                    <SalidaInvForm productos={productos} handleRegistrarSalida={handleRegistrarSalida} />
                </Col>
                <Col>
                    < MovimientosTable salidas={movimientos} />
                </Col>
            </Row>
            <Alert show={show} variant="success">
                Salida Registrada!
            </Alert>
        </div>
    )
}

export default SalidaInventarios
