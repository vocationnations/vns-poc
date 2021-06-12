import React from 'react';
import {useHistory} from 'react-router-dom';
import AuthService from "../../auth/auth.service";
import {useUser} from "../../auth/context/user-provider";

import './user-dashboard.component.css'
import SurveyorComponent from "../../../surveyor.component";

const auth_service = new AuthService();

const UserDashboardComponent = () => {
    const history = useHistory()

    const {user} = useUser();

    const logout = () => {
        auth_service.userLogout();
        history.push('/')

    }

    return (
        <div
            className="container-fluid d-flex flex-column justify-content-center w-100 border-black pt-3">
            <div className="vspacer-20"/>
            <div className="col-lg-12 border-black">
                <button className="btn btn-danger"
                        onClick={() => logout()}>Logout
                </button>
            </div>
            <div
                className="container-fluid main-panel p-2 border-red text-center">
                <h4 className="text-uppercase font-weight-bold">VocationNations
                    User Dashboard</h4>
                <div className="vspacer-20"/>
                <div className="vspacer-20"/>
                <p className="lead">Welcome to
                    VocationNations <b>{user.username}</b>!</p>
                <div className="vspacer-20"/>
                <p className="lead">We are still developing our platform and we
                    appreciate your interest in our idea! </p>
                <p>In order to serve you better, we would like to understand
                    your current state and culture better! </p>
                <p>Please go through the following matching process in order for
                    us to serve you better! </p>

                <SurveyorComponent />

            </div>
        </div>
    )
}

export default UserDashboardComponent;
