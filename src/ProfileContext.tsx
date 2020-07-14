import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "api";
import { User } from "models/User";

const initial = {
    id: null,
    displayName: null,
    language: {
        id: null,
        url: null,
        name: ''
    }
}

export const ProfileContext = createContext<[User, React.Dispatch<React.SetStateAction<User>>]>([initial, null]);

export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({children}) => {
    const [state, setState] = useState(initial);

    useEffect(() => {
        getProfile()
            .then(profile => {
                setState(profile);
            })        
    }, [])

    return <ProfileContext.Provider value={[state, setState]}>
        {children}
    </ProfileContext.Provider>
}