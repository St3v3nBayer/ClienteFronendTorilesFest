import React, { useContext, useEffect, useState } from 'react';
import CategoriaTable from '../components/CategoriaTable';
import CatModal from '../components/CatModal';
import GlobalContext from '../context/GlobalContext';
import { Alert, Row, Col } from 'react-bootstrap';
// import { Nav, NavDropdown, Navbar, Container, FormControl, Form, Button } from 'react-bootstrap';

const Categorias = () => {
    // Estados
    const [categorias, setCategorias] = useState([]);
    const [show2, setShow2] = useState(false);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("");
    // Contextos
    const { handleGetCategorias, handlePostCat, handlePutCat, handleDeleteCat } = useContext(GlobalContext);
    // Ciclos del Componente
    useEffect(() => {
        handleGetCategorias().then(resp => {
            setCategorias(resp);
        }).catch(error => { throw error });
    }, [handleGetCategorias])
    //Manejadores de Eventos
    const handleGetCat = () => {
        handleGetCategorias().then(resp => {
            setCategorias(resp);
        }).catch(error => { throw error });
    }
    const handleAddCat = (descripcionCat) => {
        handlePostCat(descripcionCat).then(async (resp) => {
            if (resp.status === 201) {
                let result = await resp.json();
                handleGetCat();
                setMessage(result.message);
                setVariant("success");
                setShow2(true);
                setTimeout((() => { setShow2(false) }), 3000)
            };
        }).catch(error => { throw error });
    }
    const handleActualizarCat = (objCat) => {
        handlePutCat(objCat).then(async (resp) => {
            if (resp.status === 200) {
                let json = await resp.json();
                handleGetCat();
                setMessage(json.message);
                setVariant("success");
                setShow2(true);
                setTimeout((() => { setShow2(false) }), 3000);
            }
        }).catch(error => { throw error })
    }
    const handleEliminarCat = (objCat) => {
        let mensajeEliminar = window.confirm(`¿Desea Eliminar Categoría: ${objCat.descripcion_categoria}?`);
        if (mensajeEliminar) {
            handleDeleteCat({ id: objCat.idcategoria }).then(async (resp) => {
                if (resp.status === 200) {
                    let json = await resp.json();
                    handleGetCat();
                    setMessage(json.message);
                    setVariant("danger");
                    setShow2(true);
                    setTimeout((() => { setShow2(false) }), 3000);
                }
            }).catch(error => { throw error });
        }
    }

    return (
        <div className="container">
            <Row className="mt-4">
                <Col sm={3}>
                    <CatModal handleAddCat={handleAddCat} />
                    <Alert variant={variant} show={show2}>
                        {message}
                    </Alert>
                </Col>
                <br />
                <Col>
                    <CategoriaTable categorias={categorias} handleActualizarCat={handleActualizarCat} handleEliminarCat={handleEliminarCat} />
                </Col>
            </Row>
        </div>
    )
}

export default Categorias