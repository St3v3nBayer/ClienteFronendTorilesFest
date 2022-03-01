import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ProveedoresTable = ({ proveedores, handleCargarModal, handleEliminarProveedor }) => {

    return (
        <div className="container p-5">
            <Badge className="w-100" pill bg="dark">
                <h4>Proveedores</h4>
            </Badge>
            <hr />
            <Table responsive striped bordered hover size="sm">
                <thead>
                    <tr className="table-dark">
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map((proveedor) => {
                        return (
                            <tr key={proveedor.idproveedor}>
                                <td>{proveedor.idproveedor}</td>
                                <td>{proveedor.nombre_proveedor}</td>
                                <td>{proveedor.marca_proveedor}</td>
                                <td>
                                    <Button onClick={() => { handleCargarModal(proveedor) }} variant="warning" >
                                        <FontAwesomeIcon icon={faRetweet} fixedWidth size="lg" color="white" />
                                    </Button>
                                    {" "}
                                    <Button onClick={() => { handleEliminarProveedor(proveedor.idproveedor) }} variant="danger" >
                                        <FontAwesomeIcon icon={faTrashCan} fixedWidth size="lg" color="white" />
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default ProveedoresTable
