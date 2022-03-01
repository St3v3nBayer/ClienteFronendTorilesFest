import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUserCircle, faBoxesStacked, faUpRightFromSquare, faListCheck } from '@fortawesome/free-solid-svg-icons';

const NavbarEmpleados = ({ usuario, handleLogout }) => {

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
                            <Nav.Link as={Link} to="entradaInv" >
                                <FontAwesomeIcon icon={faBoxesStacked} fixedWidth size="lg" color="white" />
                                <h6>Entradas Inventarios</h6>
                            </Nav.Link>
                            <Nav.Link as={Link} to="salidaInv" >
                                <FontAwesomeIcon icon={faUpRightFromSquare} fixedWidth size="lg" color="white" />
                                <h6>Salidas Inventarios</h6>
                            </Nav.Link>
                            <Nav.Link as={Link} to="productos" >
                                <FontAwesomeIcon icon={faListCheck} fixedWidth size="lg" color="white" />
                                <h6>Productos</h6>
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

export default NavbarEmpleados
