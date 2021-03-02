import React from 'react';
import './home-guest.component.css'

const HomeGuestComponent = () => {
    return (
        <div className="container-fluid p-0">
            <section className="heroSection p-0">
                <div className="container">
                    <h1>VocationNations</h1>
                    <span
                        className="text-muted font-italic">Think of us like your wingman, only we lift your careers!</span>
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
                        we can ping
                        you once we're ready
                    </p>
                    <div className="w-50 mx-auto">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Your Name"/>
                        <br/>

                        <label>Organization</label>
                        <input type="text" className="form-control" placeholder="Your Organization"/>
                        <br/>

                        <label>Phone</label>
                        <input type="text" className="form-control" placeholder="+1 (XXX) XXX-XXXX"/>
                        <br/>

                        <button className="btn btn-primary btn-info">Sign up!</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomeGuestComponent;
