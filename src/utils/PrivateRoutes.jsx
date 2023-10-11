import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from '../store/UserStore'

const PrivateRoutes = () => {
    const user = useUserStore(state => state.user);
    
    const navigate = () => {
        // if user trys go through secure path we add this item to storage and open login modal
        // we delete this item after login modal opens
        localStorage.setItem('redirect-auth', 1);
        return <Navigate to="/" />
    }
    return (
        user ? <Outlet /> : navigate()
    )
}

export default PrivateRoutes
