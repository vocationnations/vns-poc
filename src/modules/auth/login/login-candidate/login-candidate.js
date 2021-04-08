import React, {useEffect} from 'react';
import LoginComponent from "../login.component";
import AuthService from "../../auth.service";


const LoginCandidate = () => {

    return (
        <div className="container">
            <LoginComponent
                userType={'candidate'}
            />
        </div>
    );
}

export default LoginCandidate;
