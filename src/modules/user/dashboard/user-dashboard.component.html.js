import React from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from "../../auth/auth.service";
import {AmplifySignOut} from "@aws-amplify/ui-react";

const auth_service = new AuthService();

const UserDashboardComponent = () => {

    const history = useHistory()

    const logout = () => {
        auth_service.userLogout();
        history.push('/')
        // window.location.reload(true)

    }

    return (
        <div className="container">

            <AmplifySignOut/>
            User Dashboard coming soon...
            <button className="btn btn-danger"
                    onClick={() => logout()}>Logout</button>
        </div>
    )
}

export default UserDashboardComponent;
