import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();
    const stored = localStorage.getItem("userInfo");
    const userInfo = stored ? JSON.parse(stored) : null;

    useEffect(() => {
        if (!userInfo) {
            console.log("Redirecting to login...");
            navigate("/login", { replace: true });
        }
    }, [userInfo, navigate]);

    // Only render children if userInfo exists
    if (!userInfo) return null;

    return children;
};
