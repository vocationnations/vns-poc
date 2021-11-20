import React from 'react';


const data = [
    {
        title: "Build an effective and diverse team",
        text: "Vocation Nations helps you identify team members who will thrive in your culture."
    },
    {
        title: "By drawing from a continuous pool of candidates",
        text: "Say goodbye to enormous stacks of resumes - those towers of tedium - and embrace a free-flowing community of job-seekers who fit your team"
    },
    {
        title: "And 40 years of research in organizational behaviour",
        text: "So we know what we are talking about!"
    },
    {
        title: "A level playing field",
        text: "Say goodbye to enormous stacks of resumes - those towers of tedium - and embrace a free-flowing community of job-seekers who fit your team"
    },
    {
        title: "Pay for performance",
        text: "Simple? Yes! Like 1, 2, 3. <br />" +
            "Identify your needs → select your matches → interview-ready" +
            " candidates. <br />" +
            "✅  Pay for the candidates who fit your team <br />" +
            "🚫 Zero risk"
    }
]

const JobSeekerPitch = () => {
    return (
        <div className="container text-center p-0 pt-5">
            {
                data.map((r,i) => {
                    if(i%2 === 0) {
                        console.log("Even: " + r.title)
                        return (
                            <div className="row pb-5" key={i}>
                                <div className="col-lg-4 border-black">
                                    <h6 className="text-uppercase">{r.title}</h6>
                                    <p className="lead">{r.text}</p>
                                </div>
                                <div className="col-lg-8 border-red">Image</div>
                            </div>
                        )
                    } else {
                        console.log("Odd: " + r.title)
                        return (
                            <div className="row pb-5" key={i}>
                                <div className="col-lg-8 border-red">Image</div>
                                <div className="col-lg-4 border-black">
                                    <h6 className="text-uppercase font-weight-bolder">{r.title}</h6>
                                    <p className="lead">{r.text}</p>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>

);
}

export default JobSeekerPitch;
