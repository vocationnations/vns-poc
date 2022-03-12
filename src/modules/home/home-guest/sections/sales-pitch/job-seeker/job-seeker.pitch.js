import React from 'react';

import './job-seeker.pitch.css'
import {Link} from "react-router-dom";

const data = [
    {
        title      : "Join an effective and diverse team",
        text       : "Vocation Nations helps you identify employment" +
            " opportunities that match your culture type.",
        image_url  : "/images/employer-pitch/img1.png",
        button_text: "Start your cultural alignment today!"
    },
    {
        title      : "By drawing from a continuous pool of employers",
        text       : "Say goodbye to enormous stacks of applications - those" +
            " towers of" +
            " tedium - and embrace a free-flowing list of employers who fit" +
            " your style",
        image_url  : "/images/employer-pitch/img2.png",
        button_text: "Access your matches today!"
    },
    {
        title      : "And 40 years of research in organizational behaviour",
        text       : "So we know what we are talking about!",
        image_url  : "/images/employer-pitch/img3.png",
        button_text: "Access our experience today!"
    },
    {
        title      : "A level playing field for our job-seekers.",
        text       : "Our anonymous matching system puts a dent in bias" +
            " hiring.",
        image_url  : "/images/employer-pitch/img4.png",
        button_text: "Explore our award-winning design now!"
    },
    {
        title      : "Free for thee!",
        text       : "Simple? Yes. Free? Absolutely!,",
        image_url  : "/images/employer-pitch/img5.png",
        button_text: "Start saving money now!"
    }
]

const JobSeekerPitch = ({}) => {
    return (
        <>
            {
                data.map((r, i) => {
                    if (i % 2 === 0) {
                        console.log("Even: " + r.title)
                        return (
                            <section style={{backgroundColor: "#e8dfdc"}}>
                                <div className="container text-center p-0 pt-5">
                                    <div className="row pb-5 align-items-center"
                                         key={i}>
                                        <div className="col-lg-5 p-0 pl-5 pr-1">
                                            <h6 className="text-uppercase">{r.title}</h6>
                                            <div className="vspacer-20"/>
                                            <p className="lead">{r.text}</p>
                                            <Link to="/signup?type=jobseeker">
                                                <button
                                                    className="btn btn-info"
                                                >{r.button_text}
                                                </button>
                                            </Link>
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
                        console.log("Odd: " + r.title)
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
                                            <Link to="/signup?type=jobseeker">
                                                <button
                                                    className="btn btn-info"
                                                >{r.button_text}
                                                </button>
                                            </Link>
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

export default JobSeekerPitch;
