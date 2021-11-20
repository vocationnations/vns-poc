import React from 'react';

const HeroSection = () => {
    return(
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
    )
}

export default HeroSection;
