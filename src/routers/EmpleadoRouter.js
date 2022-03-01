import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeDash from '../components/HomeDash'
import ProductoForm from '../components/ProductoForm'
import TablaProductos from '../components/TablaProductos'
import AuthContext from '../context/AuthContext'
import Dashboard from '../pages/Dashboard'
import EntradasInventario from '../pages/EntradasInventario'
import Productos from '../pages/Productos'
import SalidaInventarios from '../pages/SalidaInventarios'

const EmpleadoRouter = () => {

    const { usuario } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/*" element={<Dashboard />}>
                <Route index element={<HomeDash nombre={usuario.nombre} />} />
                <Route path="entradaInv" element={<EntradasInventario />} />
                <Route path="salidaInv" element={<SalidaInventarios />} />
                <Route path="productos/*" element={<Productos />} >
                    <Route index element={< TablaProductos />} />
                    <Route path="cuProducto" element={< ProductoForm />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default EmpleadoRouter;
