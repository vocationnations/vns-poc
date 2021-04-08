import React from 'react';
import LoginComponent from "../login.component";
import AuthService from "../../auth.service";

const LoginCompany = () => {
    return (
        <div className="container">
            <LoginComponent
                userType={AuthService.userType.Company}
            />
        </div>
    );
}

export default LoginCompany;
