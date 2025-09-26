import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserData } from "../api/user";
import { logoutUser } from "../api/auth";
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeAuth = async () => {
            setIsLoading(true);
            try {
                const userId = JSON.parse(localStorage.getItem('outreachiq-user'));
                if (userId) {
                    await fetchAndSetUser(userId);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                setIsLoggedIn(false);
                setUserObj({});
                localStorage.removeItem('outreachiq-user');
            } finally {
                setIsLoading(false);
                setIsInitialized(true);
            }
        };

        initializeAuth();
    }, []);

    const fetchAndSetUser = async (id) => {
        try {
            const data = await fetchUserData(id);
            if (data?.status === 200) {
                setUserObj(data?.data?.result);
                setIsLoggedIn(true);
                localStorage.setItem('outreachiq-user', JSON.stringify(id));
            } else {
                throw new Error("Session expired");
            }
        } catch (error) {
            console.log(error.message);
            setUserObj({});
            setIsLoggedIn(false);
            localStorage.removeItem('outreachiq-user');
            throw error;
        }
    };

    const logoutAndClearUser = async () => {
        try {
            const response = await logoutUser();
            if (!response || response.status !== 200) throw new Error("Logout API failed");
            
            setUserObj({});
            setIsLoggedIn(false);
            localStorage.removeItem('outreachiq-user');
        } catch (error) {
            console.log(error);
            setUserObj({});
            setIsLoggedIn(false);
            localStorage.removeItem('outreachiq-user');
            toast.error("Logout failed.\nPlease try again after sometime");
        }
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            userObj,
            setUserObj,
            isLoading,
            isInitialized,
            fetchAndSetUser,
            logoutAndClearUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);