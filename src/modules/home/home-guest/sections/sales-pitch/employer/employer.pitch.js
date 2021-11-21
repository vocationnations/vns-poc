import React from 'react';

import './employer.pitch.css'

const data = [
    {
        title    : "Build an effective and diverse team",
        text     : "Vocation Nations helps you identify team members who will" +
            " thrive in your culture.",
        image_url: "/images/employer-pitch/img1.png"
    },
    {
        title    : "By drawing from a continuous pool of candidates",
        text     : "Say goodbye to enormous stacks of resumes - those towers of" +
            " tedium - and embrace a free-flowing community of job-seekers who fit your team",
        image_url: "/images/employer-pitch/img2.png"
    },
    {
        title    : "And 40 years of research in organizational behaviour",
        text     : "So we know what we are talking about!",
        image_url: "/images/employer-pitch/img3.png"
    },
    {
        title    : "A level playing field",
        text     : "Say goodbye to enormous stacks of resumes - those towers of" +
            " tedium - and embrace a free-flowing community of job-seekers who fit your team",
        image_url: "/images/employer-pitch/img4.png"
    },
    {
        title    : "Pay for performance",
        text     : "Simple? Yes! Absolutely." +
            "1) Identify your needs, 2) select your matches," +
            " 3) interview-ready" +
            " candidates." +
            " Pay for the candidates who fit your team." +
            " Zero risk",
        image_url: "/images/employer-pitch/img5.png"
    }
]

const EmployerPitch = () => {
    return (
        <>
            {
                data.map((r, i) => {
                    if (i % 2 === 0) {
                        return (
                            <section style={{backgroundColor: "#e8dfdc"}}>
                                <div className="container text-center p-0 pt-5">
                                    <div className="row pb-5 align-items-center"
                                         key={i}>
                                        <div className="col-lg-5 p-0 pl-5 pr-1">
                                            <h6 className="text-uppercase">{r.title}</h6>
                                            <div className="vspacer-20"/>
                                            <p className="lead">{r.text}</p>
                                        </div>
                                        <div className="col-lg-7 p-0 text-left">
                                            <img alt={r.text}
                                                 style={{width: "70%"}}
                                                 src={r.image_url}/></div>
                                    </div>
                                </div>
                            </section>
                        )
                    } else {
                        return (
                            <section style={{backgroundColor: "#FFF"}}>
                                <div className="container text-center p-0 pt-5">
                                    <div className="row pb-5 align-items-center"
                                         key={i}>
                                        <div
                                            className="col-lg-7 p-0 text-right">
                                            <img alt={r.text}
                                                 style={{width: "70%"}}
                                                 src={r.image_url}/></div>
                                        <div className="col-lg-5 p-0 pr-5 pl-1">
                                            <h6 className="text-uppercase">{r.title}</h6>
                                            <div className="vspacer-20"/>
                                            <p className="lead">{r.text}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )
                    }
                })
            }
        </>

    );
}

export default EmployerPitch;
