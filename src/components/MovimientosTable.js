import { Table, Card, Badge } from 'react-bootstrap';

const MovimientosTable = ({ salidas }) => {

    return (
        <>
            <Card className="p-4 shadow p-3 mb-5 bg-body rounded ">
                <Badge className="w-100" pill bg="dark">
                    <h4>Salidas del Inventario</h4>
                </Badge>
                <hr />
                <Table responsive striped bordered hover>
                    <thead>
                        <tr className="table-dark">
                            <th>Fecha</th>
                            <th>Id Producto</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salidas.map((e) => {
                            return (
                                <tr key={e.idmovimiento}>
                                    <td>{e.fecha_movimiento}</td>
                                    <td>{e.idproducto}</td>
                                    <td>{e.nombre_producto}</td>
                                    <td>{e.cant}</td>
                                    <td>{e.id_usuario_movimiento}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Card>

            {/* </Col>
            </Row> */}
        </>
    )
}

export default MovimientosTable
