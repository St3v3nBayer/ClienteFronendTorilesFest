import React, { useContext, useEffect, useState } from 'react'
import FiltroFechasMov from '../components/FiltroFechasMov';
import MovimientosTable from '../components/MovimientosTable';
import AuthContext from '../context/AuthContext';
import GlobalContext from '../context/GlobalContext';
import { Row, Col } from 'react-bootstrap';
import ExportPdf from '../components/ExportPdf';

const Movimientos = () => {

    // ESTADOS
    const [movimientos, setMovimientos] = useState([]);
    // CONTEXTOS
    const { handleGetMov, handlePostFilter } = useContext(GlobalContext);
    const { usuario } = useContext(AuthContext);
    //use Effect
    useEffect(() => {
        handleGetMovimientos();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //MANEJADORES DE ESTADO
    const handleGetMovimientos = () => {
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
    const handleFiltrar = (fechas) => {
        handlePostFilter(fechas).then(async (resp) => {
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

    return (
        <div className='container mt-5'>
            <Row>
                {(() => {
                    if (usuario.rol === 1) {
                        return (
                            <Col sm={5}>
                                <FiltroFechasMov handleFiltrar={handleFiltrar} handleGetMovimientos={handleGetMovimientos} />
                                <ExportPdf salidas={movimientos} />
                            </Col>
                        )
                    }
                })()}
                <Col sm={7}>
                    <MovimientosTable usuario={usuario} salidas={movimientos} handleFiltrar={handleFiltrar} handleGetMovimientos={handleGetMovimientos} />
                </Col>
            </Row>
        </div>
    )
}

export default Movimientos
