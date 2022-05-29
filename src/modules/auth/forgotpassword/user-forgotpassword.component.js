import React, {useState} from 'react';
import {Auth} from "aws-amplify";
import AuthService from "../auth.service";
import {useHistory} from "react-router-dom";

const auth_service = new AuthService();


const UserForgotPasswordComponent = () => {

    const history = useHistory();

    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState("")
    const [error, setError] = useState('')

    const [errMessage, setErrMessage] = useState('')

    const handleForgotPassword = () => {
        auth_service.userForgotPassword(
            email,
            () => {
            setSuccess("Successfully requested password reset ...")
            setTimeout( () => { history.push('/forgotpasswordsubmit') })
        },
        (e) => { setError(e.message) })
    }
    return (
        <div className="container-fluid pt-5 row justify-content-center">
            <div className="col-lg-6 p-0">
                {errMessage && <div className="alert alert-danger"><i
                    className="fas fa-times"/> {errMessage}</div>}
                <h3 className="font-weight-bolder text-uppercase">PLease provide your email</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           type="email"
                           required className="form-control"/>
                </div>
                <button type="submit" className="btn btn-info"
                        onClick={() => handleForgotPassword()}>Reset password
                </button>
            </div>
        </div>
    );
}

export default UserForgotPasswordComponent;
