import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context';

const AuthGuard = () => {

    const { user } = useContext(UserContext);

    const storedUser = JSON.parse(localStorage.getItem("usuario"));

    return (
        user?.email || storedUser.email ? <Outlet /> : <Navigate to="/" replace={true} />
    )
}

export default AuthGuard