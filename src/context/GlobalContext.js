import { createContext } from "react";
import { ApiCategorias, ApiInventarios, ApiMovimientos } from "../helpers/Api";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    ///Peticiones Categoria
    const handleGetCategorias = async () => {
        let peticion = await fetch(ApiCategorias, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let resp = await peticion.json();
        return resp;
    }
    const handlePostCat = async (objCat) => {
        const resp = await fetch(ApiCategorias, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objCat)
        })
        return resp;
    }
    const handlePutCat = async (objCat) => {
        let resp = await fetch(ApiCategorias, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objCat)
        })
        return resp;
    }
    const handleDeleteCat = async (id) => {
        let resp = await fetch(ApiCategorias, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        })
        return resp;
    }
    ///Peticiones Movimientos
    const handleGetMov = async () => {
        let resp = await fetch(ApiMovimientos, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return resp;
    }
    const handlePostMov = async (movimiento) => {
        let resp = await fetch(ApiMovimientos, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movimiento)
        })
        return resp;
    }
    const handlePostFilter = async (fechas) => {
        let resp = await fetch(`${ApiMovimientos}/filtro`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fechas)
        })
        return resp
    }

    // Peticiones a Inventario
    const handleGetInv = async () => {
        let resp = await fetch(ApiInventarios, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return resp;
    }

    const data = { handleGetInv, handleGetCategorias, handlePostCat, handlePutCat, handleDeleteCat, handleGetMov, handlePostMov, handlePostFilter };

    return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
}

export { GlobalProvider };
export default GlobalContext;