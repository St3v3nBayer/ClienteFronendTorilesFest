import { createContext, useEffect, useState } from "react";
import { ApiLogout, ApiAuth } from "../helpers/Api";

const AuthContext = createContext();

const objUser = {
    nombre: '',
    id: '',
    rol: ''
}

const AuthProvider = ({ children }) => {
    //Estados
    const [auth, setAuth] = useState(false);
    const [usuario, setUsuario] = useState(objUser);
    //Ciclo Componente
    useEffect(() => {
        handleVerify().catch((err) => {
            throw err;
        })
    }, [])
    //Manejadores de Eventos
    const handleLogin = async (objUser) => {
        const resp = await fetch(ApiAuth, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objUser)
        })
        return resp;
    }
    const handleVerify = async () => {
        const peticion = await fetch(ApiAuth, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await peticion.json();
        if (resp.auth) {
            setAuth(true);
            setUsuario({ nombre: resp.nombre, id: resp.id , rol: resp.rol })
        }
        return resp;
    }
    const handleLogout = async() => {
        let peticion = await fetch(ApiLogout, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(peticion.status===200){
            setAuth(false);

        }
        
    }

    const data = { handleLogin, auth, handleVerify, usuario, handleLogout };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export { AuthProvider };
export default AuthContext;