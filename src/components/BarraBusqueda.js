import React, { useState } from 'react';
import './cardStyle.css';
import { FormControl, Form, Col } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const BarraBusqueda = ({ filtro }) => {

    const [busqueda, setBusqueda] = useState("");

    const handleChange = (e) => {
        setBusqueda(e.target.value);
        filtro(e.target.value);
    }

    return (
        <div>
            <Col sm={7} className="container">
                <Form className="d-flex">
                    <FormControl
                        value={busqueda}
                        onChange={handleChange}
                        type="search"
                        placeholder="Buscar por nombre o id de usuario"
                        className="me-2"
                        aria-label="Search"
                    />
                    {/* <Button variant="dark" disabled>
                    <FontAwesomeIcon icon={faMagnifyingGlass} fixedWidth size="1x" color="#32CBCC" />
                </Button> */}
                </Form>
            </Col>
        </div>
    )
}

export default BarraBusqueda
