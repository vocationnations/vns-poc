import React, {useState} from 'react';
import AuthService from "../auth.service";
import {Link, useHistory} from 'react-router-dom';
import {useUser} from "../context/user-provider";

import './login.component.css'
import {Auth} from "aws-amplify";

const auth_service = new AuthService();


const LoginComponent = () => {

    const history = useHistory();


    const {setUser, setUserID} = useUser();

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const [errMessage, setErrMessage] = useState('')

    const handleSignIn = () => {
        auth_service.userLogin(
            email, pass,
            (user) => {
git
                // get the user_id from the vns database for this user
                auth_service.getUserIdFromEmail(user.attributes.email, (res) => {
                    // set the user_id in the context
                    setUserID(res.id)
                    // redirect to the home page
                    history.push('/a')
                }, (err) => setErrMessage(err.message))

                console.log("USER IS")
                console.log(user.attributes.email)
                setUser(user)
                history.push('/a')
            },
            (err) => setErrMessage(err.message))
    }


    return (
        <div className="container-fluid pt-5 row justify-content-center">
            <div className="col-lg-6 p-0">
                {errMessage && <div className="alert alert-danger"><i
                    className="fas fa-times"/> {errMessage}</div>}
                <h3 className="font-weight-bolder text-uppercase">login</h3>
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
                        onClick={() => handleSignIn()}>Sign In
                </button>
                <Link to={"/forgotpassword" }>
                    <label>forgot password?</label>
            </Link>
            </div>
        </div>
    );
}

export default LoginComponent;
