import React from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from "../../auth/auth.service";

const auth_service = new AuthService();

const UserDashboardComponent = () => {

    const history = useHistory()

    const logout = () => {
        auth_service.userLogout();
        history.push('/')

    }

    return (
        <div className="container d-flex justify-content-center w-100">
            <div className="vspacer-20"/>
            <div className="d-flex flex-column">
                Thank you for signing up! Our website is under construction.
                Please check back later!
                <br/>
                <div className="vspacer-20"/>
                <div className="w-50 d-flex justify-content-end">
                    <button className="btn btn-danger"
                            onClick={() => logout()}>Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserDashboardComponent;
