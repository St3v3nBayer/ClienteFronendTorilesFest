import React, { useContext, useEffect, useState } from 'react'
import IngresarInvForm from '../components/IngresarInvForm';
import InventariosTable from '../components/InventariosTable'
import AuthContext from '../context/AuthContext';
import GlobalContext from '../context/GlobalContext'
import ProContext from '../context/ProContext';
import { Alert, Row, Col } from 'react-bootstrap';

const EntradasInventario = () => {
    // Estados
    const [inventarios, setInventarios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [show, setShow] = useState(false);
    // Ciclo de vida del componente
    useEffect(() => {
        handleTraerInventarios();
        handleGetProd()
            .then(resp => resp.json())
            .then(data => setProductos(data))
            .catch(error => { throw error })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // Contextos
    const { usuario } = useContext(AuthContext);
    const { handleGetInv, handlePostMov } = useContext(GlobalContext);
    const { handleGetProd } = useContext(ProContext);
    // Manejadores de Eventos
    const handleTraerInventarios = () => {
        handleGetInv().then(async (resp) => {
            if (resp.status === 200) {
                let json = await resp.json();
                setInventarios(json);
            }
        }).catch(error => { throw error })
    }
    const handleIngresarProdInv = (entradaStock) => {
        handlePostMov(entradaStock).then(async (resp) => {
            if (resp.status === 201) {
                handleTraerInventarios();
                setShow(true);
                setTimeout(() => { setShow(false) }, 3000);
            }
        }).catch(error => { throw error })
    }

    return (
        <>
            <Row>
                <Col sm={5}>
                    <IngresarInvForm usuario={usuario} prod={productos} handleIngresarProdInv={handleIngresarProdInv} />
                    <br />
                    <Alert show={show} variant="success">
                        Inventario ingresado!
                    </Alert>
                </Col>
                <br />
                <Col sm={7}>
                    <InventariosTable inv={inventarios} />
                </Col>
            </Row>
        </>
    )
}

export default EntradasInventario
