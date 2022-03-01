import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';

const PublicRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/*" element={<Navigate to="/"/>} />
        </Routes>
    )
}

export default PublicRouter
