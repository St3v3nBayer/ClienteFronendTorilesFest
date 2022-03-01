import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import userActivado from '../assets/user3.png';
import userDesactivado from '../assets/user2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleArrowsLeftRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './cardStyle.css';

const CardComponent = ({ usuario }) => {

    const [estado, setEstado] = useState("");
    useEffect(() => {
        if (usuario.estado_usuario === "Activado") {
            setEstado(userActivado);
        }
        else if (usuario.estado_usuario === "Desactivado") {
            setEstado(userDesactivado);
        }
    }, [usuario.estado_usuario])

    return (
        <>
            <Card className="mx-2 my-2 shadow p3 mb-5 bg-body rounded" style={{ width: '13rem', height: "auto" }}>
                <Card.Img variant="top" src={estado} />
                <hr />
                <Card.Body size="sm">
                    <Card.Title>{usuario.nombre_usuario} {usuario.apellido_usuario}</Card.Title>
                    <b>id: </b>{usuario.idusuario}.
                    <br/><b>Rol: </b>{usuario.descripcion_rol}.
                    <br/><b>Tel: </b>{usuario.telefono_usuario}.
                    <br/><b>Correo: </b>{usuario.correo_usuario}.
                    <Card.Text><b>Estado: </b>{usuario.estado_usuario}.</Card.Text>
                    <hr />
                    <Button variant="white">
                        <FontAwesomeIcon icon={faPeopleArrowsLeftRight} fixedWidth size="2x" color="#00A699" />
                    </Button>
                    <Button variant="white">
                        <FontAwesomeIcon icon={faTrashCan} fixedWidth size="2x" color="#FF5A5F" />
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default CardComponent;
