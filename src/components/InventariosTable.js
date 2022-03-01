import { useEffect, useState } from 'react';
import { Table, Form, FormControl, Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const InventariosTable = ({ inv }) => {

    const [inventarios, setInventarios] = useState([]);
    const [copiaInv, setCopiaInv] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        setInventarios(inv);
        setCopiaInv(inv);
    }, [inv])

    const handleChange = (e) => {
        setBusqueda(e.target.value)
        filtrar(e.target.value)
    }

    const filtrar = (buscar) => {
        let resultados = copiaInv.filter((element) => {
            if (element.nombre_producto.toString().toLowerCase().includes(buscar.toLowerCase()) || element.id_producto_inventario.toString().toLowerCase().includes(buscar.toLowerCase())) {
                return element
            }
            return "";
        })
        setInventarios(resultados);
    }


    return (
        <div className="container mt-5 shadow p-3 mb-5 bg-body rounded">
            <Card className="p-4">
                <Form className="d-flex">
                    <FormControl
                        value={busqueda}
                        onChange={handleChange}
                        type="search"
                        placeholder="Buscar por nombre o id de producto..."
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="primary">
                        <FontAwesomeIcon icon={faMagnifyingGlass} fixedWidth size="1x" color="white" />
                    </Button>
                </Form>
                <br />
                <Badge className="w-100" pill bg="dark">
                    <h4>Productos</h4>
                </Badge>
                <hr />
                <Table responsive striped bordered hover size="sm">
                    <thead>
                        <tr className="table-dark">
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Stock Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventarios.map((inventario) => {
                            if (inventario.cant_inventario === "0") {
                                return (
                                    <tr className="table-danger" key={inventario.idinventario}>
                                        <td>{inventario.id_producto_inventario}</td>
                                        <td>{inventario.nombre_producto}</td>
                                        <td>{inventario.cant_inventario}</td>
                                    </tr>
                                )
                            }
                            if (inventario.cant_inventario !== "0") {
                                return (
                                    <tr key={inventario.idinventario}>
                                        <td>{inventario.id_producto_inventario}</td>
                                        <td>{inventario.nombre_producto}</td>
                                        <td>{inventario.cant_inventario}</td>
                                    </tr>
                                )
                            }
                            else { return "" }
                        })}
                    </tbody>
                </Table>
            </Card>
        </div>
    )
}

export default InventariosTable;
