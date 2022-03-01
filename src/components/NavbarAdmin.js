import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUserCircle, faLayerGroup, faUpRightFromSquare, faListCheck, faPeopleArrowsLeftRight, faUsers } from '@fortawesome/free-solid-svg-icons';


const NavbarAdmin = ({ usuario, handleLogout }) => {
    
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top img-fluid rounded-circle "
                        />
                        {" "}
                        <h5>Toriles Fest</h5>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="categorias" >
                                <FontAwesomeIcon icon={faLayerGroup} fixedWidth size="lg" color="white" />
                                <h6>Categoría</h6>                                
                            </Nav.Link>
                            <Nav.Link as={Link} to="movimientos" >
                                <FontAwesomeIcon icon={faUpRightFromSquare} fixedWidth size="lg" color="white" />
                                <h6>Movimientos</h6>                                
                            </Nav.Link>
                            <Nav.Link as={Link} to="productos" >
                                <FontAwesomeIcon icon={faListCheck} fixedWidth size="lg" color="white" />
                                <h6>Productos</h6>                                
                            </Nav.Link>
                            <Nav.Link as={Link} to="proveedores" >
                                <FontAwesomeIcon icon={faPeopleArrowsLeftRight} fixedWidth size="lg" color="white" />
                                <h6>Proveedores</h6>                                
                            </Nav.Link>
                            <Nav.Link as={Link} to="usuarios" >
                                <FontAwesomeIcon icon={faUsers} fixedWidth size="lg" color="white" />
                                <h6>Usuarios</h6>                                
                            </Nav.Link>
                        </Nav>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                                <FontAwesomeIcon icon={faUserCircle} fixedWidth size="xl" color="white" />
                                {" "}
                                {usuario.nombre}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faRightFromBracket} fixedWidth size="lg" color="black" />
                                    {" "}
                                    Salir
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarAdmin
