import { createContext, useContext, useState } from "react";
import { fetchUserData } from "../api/user";
import { logoutUser } from "../api/auth";
import toast from 'react-hot-toast';

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
            const response = await logoutUser();
            if (!response || response.status !== 200) throw new Error;
            setUserObj({});
            setIsLoggedIn(false);
            localStorage.removeItem('outreachiq-user');
        } catch (error) {
            console.log(error);
            toast.error("Logout failed.\nPlease try again after sometime");
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