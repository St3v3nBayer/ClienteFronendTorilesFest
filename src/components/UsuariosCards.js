import React, { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import { useOutletContext } from 'react-router-dom';
import { Row, Badge } from 'react-bootstrap';
import BarraBusqueda from './BarraBusqueda';

const UsuariosCards = () => {
    // Estados
    const [user, setUser] = useState([]);
    const [userCopy, setUserCopy] = useState([]);
    // Contextos
    const { usuarios } = useOutletContext();
    // Ciclo de Vida
    useEffect(() => {
        setUser(usuarios);
        setUserCopy(usuarios);
    }, [usuarios])
    // Manejadores de Eventos
    const filtro = (busqueda) => {
        let result = userCopy.filter((usuario) => {
            if (usuario.nombre_usuario.toString().toLowerCase().includes(busqueda.toLowerCase()) || usuario.apellido_usuario.toString().toLowerCase().includes(busqueda.toLowerCase()) || usuario.idusuario.toString().toLowerCase().includes(busqueda.toLowerCase())) {
                return usuario;
            } else {
                return "";
            }
        })
        setUser(result);
    }

    return (
        <div className="container mt-5">
            <Badge className="w-100" pill bg="dark">
                <h4>Usuarios</h4>
            </Badge>
            <hr />
            <BarraBusqueda filtro={filtro} />
            <hr />
            <Row>
                {user.map((usuario) => {
                    return <CardComponent key={usuario.idusuario} usuario={usuario} />
                })}
            </Row>
        </div>
    )
}

export default UsuariosCards
