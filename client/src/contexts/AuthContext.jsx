import { createContext, useContext, useState } from "react";
import { fetchUserData } from "../api/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState({});
    
    const fetchAndSetUser = async(id) =>{
        try {
            const data = await fetchUserData(id);
            if(data?.status === 200){
                setUserObj(data?.data?.result);
                setIsLoggedIn(true);
            } else {
                throw new Error("Session expired");
            }
        } catch (error) {
            console.log(error.message);
            setUserObj({});
            setIsLoggedIn(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            userObj,
            setUserObj,
            fetchAndSetUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);