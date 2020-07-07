import React, { createContext, useContext, useState, useEffect } from "react";
import { getBasicUserInfo, clearToken } from "api";

export const AuthContext = createContext([]);

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [{
        isLoading,
        isAuthenticated
    }, setState] = useState({
        isLoading: true,
        isAuthenticated: false
    });

    const auth = () => {
        getBasicUserInfo()
            .then(result => {
                setTimeout(() => {
                    setState(state => ({...state, isLoading: false, isAuthenticated: true}));
                }, 1000);
            })
            .catch(error => {
                if(error === 'EXPIRED_TOKEN') {
                    clearToken();
                }
                setState(state => ({...state, isLoading: false, isAuthenticated: false}));
            })
    }

    useEffect(() => {
        if(isAuthenticated) {
            auth();    
        }
    }, [isAuthenticated])

    useEffect(() => {
        auth();
    }, [])
    

    return <AuthContext.Provider value={[isAuthenticated, isLoading, setState]}>
        {children}
    </AuthContext.Provider>
}