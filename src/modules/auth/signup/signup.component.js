import React, {useState} from 'react';
import AuthService from "../auth.service";
import {useHistory} from 'react-router-dom';
import {useUser} from "../context/user-provider";

import './signup.component.css'
import {Auth} from "aws-amplify";

const auth_service = new AuthService();


const SignupComponent = () => {

    const history = useHistory();


    const {setUser} = useUser();

    const [email, setEmail] = useState('')
    const [pass, setPass]   = useState('')

    const [errMessage, setErrMessage] = useState('')

    const handleSignUp = () => {
        auth_service.userSignup(
            email, pass, (user) => {
                console.log("USER IS")
                console.log(user)
                setUser(user)
                history.push('/')
            },
            (err) => setErrMessage(err.message))
    }


    return (
        <div className="container-fluid pt-5 row justify-content-center">
            <div className="col-lg-6 p-0">
                {errMessage && <div className="alert alert-danger"><i
                    className="fas fa-times"/> {errMessage}</div>}
                <h3 className="font-weight-bolder text-uppercase">sign up</h3>
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
                <button type="submit" className="btn btn-info"
                        onClick={() => handleSignUp()}>Sign In
                </button>
                <lww>or</lww>
                <div
                    className="container d-flex flex-row justify-content-center">
                    <i className="fab fa-5x fa-facebook-square pr-5"
                       style={{cursor: 'pointer'}}
                       onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}
                    />
                    <i className="fab fa-5x fa-google"
                       style={{cursor: 'pointer'}}
                       onClick={() => Auth.federatedSignIn({provider: 'Google'})}
                    />
                </div>
            </div>
        </div>
    );
}

export default SignupComponent;
