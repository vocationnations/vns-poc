import React, {useState} from 'react';
import {Auth} from "aws-amplify";
import AuthService from "../auth.service";
import {useHistory} from "react-router-dom";

const auth_service = new AuthService();


const UserForgotPasswordSubmitComponent = () => {

    const history = useHistory();

    const [email, setEmail] = useState('')
    const [confirmationCode, setConfirmationCode] = useState('')
    const [pass, setPass] = useState('')
    const [success, setSuccess] = useState("")
    const [error, setError] = useState('')

    const [errMessage, setErrMessage] = useState('')

    const handleForgotPasswordSubmit = () => {
        auth_service.userForgotPasswordSubmit(
            email,
            confirmationCode,
            pass,
        () => {
            setSuccess("Successfully reset the password ...")
            setTimeout( () => { history.push('/login')}, 2000)
        },
        (e) => { setError(e.message) })
    }
    return (
        <div className="container-fluid pt-5 row justify-content-center">
            <div className="col-lg-6 p-0">
                {errMessage && <div className="alert alert-danger"><i
                    className="fas fa-times"/> {errMessage}</div>}
                <h3 className="font-weight-bolder text-uppercase">PLease provide your credentials</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           type="email"
                           required className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={pass}
                           onChange={(e) => setPass(e.target.value)}
                           type="password"
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Confirmation code</label>
                    <input value={confirmationCode}
                           onChange={(e) => setConfirmationCode(e.target.value)}
                           type="text"
                           className="form-control"/>
                </div>
                <button type="submit" className="btn btn-info"
                        onClick={() => handleForgotPasswordSubmit()}>done
                </button>
            </div>
        </div>
    );
}

export default UserForgotPasswordSubmitComponent;
