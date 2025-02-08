import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    // const location = useLocation();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo && location.pathname !== "/register") {
            navigate('/login')
        }
        setUser(userInfo)
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}