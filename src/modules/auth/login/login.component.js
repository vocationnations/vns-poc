import React, {useState} from 'react';
import AuthService from "../auth.service";
import {useHistory} from 'react-router-dom';

const auth_service = new AuthService();

const LoginComponent = ({userType}) => {

    const history = useHistory();


    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const [errMessage, setErrMessage] = useState('')

    const handleSignIn = (e) => {

        e.preventDefault();


        auth_service.checkUserType(
            email,
            userType,
            (r) => {
                console.log(r)
            },
            (e) => {
               console.log(e)
            }
        )

        auth_service.userLogin(email, pass, () => {
        }, (err) => setErrMessage(err.message))
        history.push('/')
    }


    return (
        <div className="container-fluid pt-5 row justify-content-center">
            <div className="col-lg-6 p-0">
                {errMessage && <div className="alert alert-danger"><i className="fas fa-times"/> {errMessage}</div>}
                <h3 className="font-weight-bolder text-uppercase">sign in</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                           required className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password"
                           className="form-control"/>
                </div>
                <button type="submit" className="btn btn-info" onSubmit={(event) => event.preventDefault()}
                        onClick={(e) => handleSignIn}>Sign In
                </button>
            </div>
        </div>
    );
}

export default LoginComponent;
