import React from 'react';
import {UserProvider} from "../auth/context/user-provider";
import RoutesComponent from "../routes/routes.component";

const HomeComponent = () => {

    return (
        <UserProvider>
            <RoutesComponent/>
        </UserProvider>
    );
}

export default HomeComponent;
