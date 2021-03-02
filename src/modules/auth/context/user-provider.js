import React, {createContext, useContext, useEffect, useState} from 'react';
import {firebaseAppAuth} from "../../../config/firebase-config"

const UserContext = createContext()

function useUser() {
    return useContext(UserContext)
}

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebaseAppAuth
            .onAuthStateChanged((user) => {
                setUser(user)
            })
    }, [user])

    return (
        <UserContext.Provider value={{user: user}}>
            {children}
        </UserContext.Provider>
    );
}

export {
    useUser,
    UserProvider
}
