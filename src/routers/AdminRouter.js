import { Route, Routes } from 'react-router-dom'
import HomeDash from '../components/HomeDash'
import ProductoForm from '../components/ProductoForm'
import TablaProductos from '../components/TablaProductos'
import UsuariosCards from '../components/UsuariosCards'
import UsuariosForm from '../components/UsuariosForm'
import UsuariosTable from '../components/UsuariosTable'
import Categorias from '../pages/Categorias'
import Dashboard from '../pages/Dashboard'
import Movimientos from '../pages/Movimientos'
import Productos from '../pages/Productos'
import Proveedores from '../pages/Proveedores'
import Usuarios from '../pages/Usuarios'

const AdminRouter = () => {

    return (
        <Routes>
            <Route path="/*" element={<Dashboard />}>
                <Route index element={< HomeDash />} />
                <Route path="categorias/" element={<Categorias />} />
                <Route path="movimientos" element={<Movimientos />} />
                <Route path="productos/*" element={<Productos />} >
                    <Route index element={< TablaProductos />} />
                    <Route path="cuProducto" element={< ProductoForm />} />
                </Route>
                <Route path="proveedores" element={<Proveedores />} />
                <Route path="usuarios/*" element={<Usuarios />} >
                    <Route index element={<UsuariosTable />} />
                    <Route path="cuUsuario" element={<UsuariosForm />} />
                    <Route path="usuarioCard" element={<UsuariosCards />} />
                </Route>
            </Route>
            {/* <Route path="/*" element={<NotFound />} /> */}
        </Routes>
    )
}

export default AdminRouter
