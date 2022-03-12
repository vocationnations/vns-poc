import React, {useState} from 'react';
import AuthService from "../auth.service";
import {Button, ButtonGroup} from 'react-bootstrap';
import {useLocation} from "react-router-dom";

import './signup.component.css'
import {Auth} from "aws-amplify";

const auth_service = new AuthService();

const UserTypes = ["employer", "jobseeker"]

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    const {search} = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SignupComponent = () => {

    let query          = useQuery();
    let user_type_code = query.get("type") === "jobseeker" ? 1 : 0;

    const [email, setEmail]           = useState('')
    const [pass, setPass]             = useState('')
    const [userType, setUserType]     = useState(user_type_code);
    const [success, setSuccess]       = useState('');
    const [errMessage, setErrMessage] = useState('')

    const handleSignUp = () => {
        auth_service.userSignup(
            email, pass, () => {
                // setUser(user)
                let confirm_url = window.location.protocol + '//' + window.location.host + '/#/confirm/' + email
                setSuccess("Successfully signed up! Please check your email." +
                    " Once you get the code, go to this URL <a" +
                    " href='" + confirm_url + "'>" + confirm_url + "</a>" +
                    " to activate your account!")
                setErrMessage("")
            },
            (err) => setErrMessage(err.message),
            {
                "custom:vn:usertype" : UserTypes[userType],
                "custom:vn:firsttime": "true"
            }
        )
    }

    const toggleUserType = () => setUserType(+!userType)

    let emp_variant = userType === 0 ? "outline-info active" : "outline-info"
    let js_variant  = userType === 1 ? "outline-info active" : "outline-info"

    return (
        <div className="container-fluid pt-5 row justify-content-center">
            <div className="col-lg-6 p-0">
                {success !== "" &&
                    <div className="alert alert-success"
                         dangerouslySetInnerHTML={{__html: success}}/>}
                {errMessage !== "" && <div className="alert alert-danger"><i
                    className="fas fa-times"/> {errMessage}</div>}
                <div className="vspacer-20"/>
                <h3 className="font-weight-bolder text-uppercase">sign up</h3>
                <div className="row justify-content-center">
                    <ButtonGroup aria-label="Basic example">
                        <Button className="radioButton" variant={emp_variant}
                                onClick={() => toggleUserType()}>Employer</Button>
                        <Button className="radioButton" variant={js_variant}
                                onClick={() => toggleUserType()}>Job
                                                                 Seeker</Button>
                    </ButtonGroup>
                </div>
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
                        onClick={() => handleSignUp()}>Sign Up
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
