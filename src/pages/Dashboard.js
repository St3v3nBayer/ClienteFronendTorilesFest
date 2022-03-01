import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Outlet } from 'react-router-dom';
import { GlobalProvider } from '../context/GlobalContext';
import { ProProvider } from '../context/ProContext';
import { UsuarioProvider } from '../context/UsuarioContext';
import NavbarEmpleados from '../components/NavbarEmpleados';
import NavbarAdmin from '../components/NavbarAdmin';


const Dashboard = () => {
    const { usuario, handleLogout } = useContext(AuthContext);
    const [Rol, setRol] = useState(0);
    useEffect(() => {
        setRol(usuario.rol);
    }, [usuario])

    return (
        <div>
            {(() => {
                if (Rol === 1 || Rol === 3) {
                    return <NavbarAdmin usuario={usuario} handleLogout={handleLogout} />
                }
                else if (Rol === 2) {
                    return <NavbarEmpleados usuario={usuario} handleLogout={handleLogout} />
                }
            })()}

            <GlobalProvider>
                <ProProvider>
                    <UsuarioProvider>
                        <Outlet />
                    </UsuarioProvider>
                </ProProvider>
            </GlobalProvider>

        </div>

    )
}

export default Dashboard
