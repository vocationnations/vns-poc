import React from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from "../../auth/auth.service";

const auth_service = new AuthService();

const UserDashboardComponent = () => {

    const history = useHistory()


    const logout = () => {
        auth_service.userLogout();
        history.push('/');
    }

    return (
        <div className="container">
            User Dashboard coming soon... <button className="btn btn-danger" onClick={() => logout()}>Logout</button>
        </div>
    )
}

export default UserDashboardComponent;
