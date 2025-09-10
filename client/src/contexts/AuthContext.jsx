import { createContext, useContext, useState } from "react";
import { fetchUserData } from "../api/user";
import { logoutUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState({});

    const fetchAndSetUser = async (id) => {
        try {
            const data = await fetchUserData(id);
            if (data?.status === 200) {
                setUserObj(data?.data?.result);
            } else {
                throw new Error("Session expired");
            }
        } catch (error) {
            console.log(error.message);
            setUserObj({});
            setIsLoggedIn(false);
            // localStorage.removeItem('outreachiq-user');
        }
    }

    const logoutAndClearUser = async () => {
        try {
            setUserObj({});
            setIsLoggedIn(false);
            localStorage.removeItem('outreachiq-user');
            const data = await logoutUser();
            if (!data?.status === 200) throw new Error;
        } catch (error) {
            console.log(error);
        } 
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            userObj,
            setUserObj,
            fetchAndSetUser,
            logoutAndClearUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);