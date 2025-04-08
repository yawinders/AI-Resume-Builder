import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const useAuthentication = () => {
    const result = useContext(AuthContext)
    return result;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    // const location = useLocation();

    const [pic, setPic] = useState()
    // useEffect(() => {
    //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //     if (!userInfo && location.pathname !== "/register") {
    //         navigate('/login')
    //     }
    //     setUser(userInfo)
    // }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, setUser, pic, setPic }}>
            {children}
        </AuthContext.Provider>
    )
}