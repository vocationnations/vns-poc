import React, {useState} from 'react';
import './home-guest.component.css'
import HomeGuestService from "./home-guest.service";

const home_guest_service = new HomeGuestService();

const HomeGuestComponent = () => {

    const [name, setName] = useState("");
    const [org, setOrg] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const recordPreSignup = () => {

        setError("")
        setSuccess("")

        if (name === "" || email === "" || phone === "") {
            setError("The fields name, email and phone are required.")
        } else {

            home_guest_service.recordNewPreSignup(
                {
                    name: name,
                    email: email,
                    phone: phone,
                    organization: org,
                    timestamp: Math.round(Date.now())
                },
                () => setSuccess("Thank you for reaching out! We will be in touch soon!"),
                (e) => setError(e.message)
            )
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
                        VocationNations is here to facilitate successful employment by applying advanced assessment
                        tools and
                        occupational information systems to achieve good cultural and vocational fit while eliminating
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
            <section className="formSection p-0">
                <div className="container p-5">
                    <h1 className="text-center text-uppercase">pre-signup</h1>
                    <p className="lead">
                        We're still developing our awesome application, but in the meantime, please signup below so that
                        we can ping you once we're ready! We will not share your data or spam you with constant emails.

                        You will hear from us when we launch BETA Summer 2021.
                    </p>
                    <div className="w-50 mx-auto">
                        {error !== "" && <div className="alert alert-danger">{error}</div>}
                        {success !== "" && <div className="alert alert-success">{success}</div>}
                        <div className="vspacer-20"/>
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            required
                            onChange={(e) => setName(e.target.value)}/>
                        <br/>

                        <label>Organization (optional)</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Your Organization"
                            onChange={(e) => setOrg(e.target.value)}
                        />
                        <br/>

                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Your Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
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

                        <button onClick={() => recordPreSignup()} className="btn btn-primary btn-info">Sign up!</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomeGuestComponent;
