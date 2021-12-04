import React from 'react';

import AuthService from "../../auth/auth.service";
import {useHistory} from "react-router-dom";

const auth_service = new AuthService();

const OnBoardingComponent = () => {

    const history = useHistory()

    const logout = () => {
        auth_service.userLogout();
        history.push('/')

    }

    return (
        <div>
            <h1>OnBoarding!</h1>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
}
export default OnBoardingComponent;
