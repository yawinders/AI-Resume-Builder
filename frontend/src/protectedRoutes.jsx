import { Navigate } from "react-router-dom"



export const protectedRoutes = ({ children }) => {
    const userInfo = localStorage.getItem('userInfo')

    return userInfo ? children : <Navigate to='/login' />
}