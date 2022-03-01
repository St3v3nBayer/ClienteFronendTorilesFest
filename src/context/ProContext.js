import { createContext } from "react";
import { ApiProductos, ApiProveedores } from "../helpers/Api";

const ProContext = createContext();

const ProProvider = ({ children }) => {
    
    ///////// Peticiones a EndPoint Producto////////////
    const handleGetProd = async () => {
        const resp = await fetch(ApiProductos, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // console.log(resp.json())
        return resp;
    }
    const handlePostProd = async (objProducto) => {
        const resp = await fetch(ApiProductos, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objProducto)
        })
        return resp;
    }
    const handlePutProd = async (objProducto) => {
        const resp = await fetch(ApiProductos, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objProducto)
        })
        return resp;
    }
    const handleDeleteProd = async (id) => {
        const resp = await fetch(ApiProductos, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        })
        return resp;
    }
    ///////// Peticiones a EndPoint Proveedor////////////
    const handleGetProv = async () => {
        const resp = await fetch(ApiProveedores, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return resp;
    }
    const handlePostProv = async (objProveedor) => {
        const resp = await fetch(ApiProveedores, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objProveedor)
        })
        return resp;
    }
    const handlePutProv = async (objProveedor) => {
        const resp = await fetch(ApiProveedores, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objProveedor)
        })
        return resp;
    }
    const handleDeleteProv = async (id) => {
        const resp = await fetch(ApiProveedores, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        })
        return resp;
    }

    const data = { handleGetProd, handlePostProd, handlePutProd, handleDeleteProd, handleGetProv, handlePostProv, handlePutProv, handleDeleteProv };

    return <ProContext.Provider value={data}>{children}</ProContext.Provider>
}

export { ProProvider };
export default ProContext;