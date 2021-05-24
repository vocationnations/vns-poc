import React, {createContext, useContext, useEffect, useState} from 'react';
import {Auth, Hub} from 'aws-amplify';

const UserContext = createContext()

function useUser() {
    return useContext(UserContext)
}

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(user => setUser(user))
    }, [user])

    useEffect(() => {

        Hub.listen('auth', (data) => {
            const {payload} = data;
            console.log('new event!', data)
            if (payload.event === 'signIn') {
                setUser(payload.data);
            }
            if (payload.event === 'signOut') {
                setUser(null);
            }
        })
    }, [])

    return (
        <UserContext.Provider value={{user: user, setUser: setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export {
    useUser,
    UserProvider
}
