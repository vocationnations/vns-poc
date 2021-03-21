import React from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from "../../auth/auth.service";
import VnsPocComponent from "./vns-poc.component";
import './user-dashboard.component.css';

const auth_service = new AuthService();

const UserDashboardComponent = () => {

    const history = useHistory()


    const logout = () => {
        auth_service.userLogout();
        history.push('/');
    }

    return (
        <div className="container">
            <div className="col-lg-12 card">
                <br/>
                <button className="btn btn-danger col-lg-4 mx-auto" onClick={() => logout()}>Logout</button>
            </div>
            <hr/>
            <VnsPocComponent/>
        </div>
    )
}

export default UserDashboardComponent;
