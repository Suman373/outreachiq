import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedin] = useState(false);
    const [userObj, setUserObj] = useState({});

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedin,
            userObj,
            setUserObj
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);