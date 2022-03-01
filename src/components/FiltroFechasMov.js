import React, { useState } from 'react';
import { Col, Alert, Row, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTrash } from '@fortawesome/free-solid-svg-icons';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale('es', es)
setDefaultLocale("es");

const FiltroFechasMov = ({ handleFiltrar, handleGetMovimientos }) => {

    const [date_1, setDate_1] = useState(new Date());
    const [date_2, setDate_2] = useState(new Date());
    const fechaInicial = `${date_1.getFullYear()}/${date_1.getMonth() + 1}/${date_1.getDate()}`;
    const fechaFinal = `${date_2.getFullYear()}/${date_2.getMonth() + 1}/${date_2.getDate() + 1}`;

    return (
        <>
            <Col >
                <Alert variant="light">
                <Badge className="w-100" bg="dark">
                    <h5 >Filtrar Fechas</h5>
                </Badge>
                    <hr />
                    <Row>
                        <Col>
                            <label>Ingrese Fecha Desde:</label>
                            <DatePicker selected={date_1} onChange={(date) => setDate_1(date)} />
                        </Col>
                        <Col>
                            <label>Ingrese Fecha Hasta:</label>
                            <DatePicker selected={date_2} onChange={(date) => setDate_2(date)} />
                        </Col>
                    </Row>
                    <br />
                    <Row className="justify-content-ms-center">
                        <Col>
                            <Button variant="warning" onClick={() => { handleFiltrar({ fechaI: fechaInicial, fechaF: fechaFinal }) }}>
                                <FontAwesomeIcon icon={faFilter} fixedWidth size="sm" color="white" />
                                {" "}
                                Filtrar
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={handleGetMovimientos}>
                                <FontAwesomeIcon icon={faTrash} fixedWidth size="sm" color="white" />
                                {" "}
                                Borrar Filtro
                            </Button>
                        </Col>
                    </Row>
                </Alert>
            </Col>
            <hr />
        </>
    )
}

export default FiltroFechasMov
