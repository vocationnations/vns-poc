import React, {useState} from 'react';
import './home-guest.component.css'
import {Auth} from "aws-amplify";
import {useHistory} from "react-router-dom";

const HomeGuestComponent = () => {

    const [name, setName] = useState("");
    const [org, setOrg] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState('');

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const history = useHistory();

    const recordPreSignup = () => {

        setError("")
        setSuccess("")

        if (name === "" || email === "" || phone === "") {
            setError("The fields name, email and phone are required.")
        } else {

            Auth.signUp({
                    username: email,
                    password: password,
                    attributes: {
                        email: email,
                        'custom:org': org,
                        phone_number: phone
                    }
                }
            )
                .then((res) => {
                    console.log(res);
                    history.push('/confirm')
                })
                .catch(e => setError(e.message))
        }
    }

    return (
        <div className="container-fluid p-0">
            <section className="heroSection p-0">
                <div className="container">
                    <h1>VocationNations</h1>
                    <span
                        className="text-muted font-italic">Know what you want? let us do the rest! </span>
                    <div className="line"/>
                    <p className="lead w-75 mx-auto">
                        VocationNations is here to facilitate successful
                        employment by applying advanced assessment
                        tools and
                        occupational information systems to achieve good
                        cultural and vocational fit while eliminating
                        discrimination barriers.
                        <div className="line"/>
                        <div className="col-lg-12">
                            <i className="fab fa-facebook-f"/>&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
                            <i className="fab fa-twitter"/>
                        </div>
                        <div className="row pt-3">
              <span
                  className="small text-muted mx-auto">Copyright &copy; VocationNations 2020. All Rights Reserved</span>
                        </div>
                    </p>
                </div>
            </section>
            <section className="formSection p-0 pb-5">
                <div className="container p-5">
                    <h1 className="text-center text-uppercase">pre-signup</h1>
                    <p className="lead">
                        We're still developing our awesome application, but in
                        the meantime, please signup below so that
                        we can ping you once we're ready! We will not share your
                        data or spam you with constant emails.

                        You will hear from us when we launch BETA Summer 2021.
                    </p>
                    <div className="w-75 mx-auto">
                        {error !== "" &&
                        <div className="alert alert-danger">{error}</div>}
                        {success !== "" &&
                        <div className="alert alert-success">{success}</div>}
                        <div className="vspacer-20"/>
                        <div
                            className="d-flex flex-row justify-content-between">
                            <div className="d-flex flex-column w-100 mr-5">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Your Name"
                                    required
                                    onChange={(e) => setName(e.target.value)}/>
                                <br/>
                            </div>

                            <div className="d-flex flex-column w-75">
                                <label>Organization (optional)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Your Organization"
                                    onChange={(e) => setOrg(e.target.value)}
                                />
                                <br/>
                            </div>
                        </div>

                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Your Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br/>
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Choose a password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br/>

                        <label>Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="+1 (XXX) XXX-XXXX"
                            required
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <br/>

                        <button onClick={() => recordPreSignup()}
                                className="btn btn-primary btn-info">Sign up!
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomeGuestComponent;
