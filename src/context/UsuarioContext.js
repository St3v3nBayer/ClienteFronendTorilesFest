import { createContext } from "react";
import { ApiUsuarios, ApiTipoUser } from "../helpers/Api";

const UsuarioContext = createContext();

const UsuarioProvider = ({ children }) => {

    // Peticiones http al servidor
    const handleGetUsers = async () => {
        let resp = await fetch(ApiUsuarios, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return resp;
    }
    const handlePostUsers = async (usuario) => {
        let resp = await fetch(ApiUsuarios, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        return resp;
    }
    const handlePutUser = async (usuario) => {
        let resp = await fetch(ApiUsuarios, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        return resp;
    }
    const handleDeleteUser = async (id) => {
        let resp = await fetch(ApiUsuarios, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        })
        return resp;
    }
    const handleTipoUser = async () => {
        let resp = await fetch(ApiTipoUser, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return resp;
    }

    const data = { handleGetUsers, handlePostUsers, handlePutUser, handleDeleteUser, handleTipoUser }

    return <UsuarioContext.Provider value={data}>{children}</UsuarioContext.Provider>

}

export { UsuarioProvider };
export default UsuarioContext;
