import React, { Children, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {

    const { user } = useContext(UserAuth)

    return (
        (!user) ? <Navigate to='/login' />
            : children
    )
}

export default ProtectedRoute