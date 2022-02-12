import React, {useEffect, useState} from 'react';
import {
    JobseekerOnboardingCultureEntryComponent,
    JobseekerOnboardingJobSelectionComponent,
    JobseekerOnboardingSkillsSelectionComponent
} from "./onboarding-steps"

import '../../../../steps.css'

const OnBoardingMessage = ({setStepNumber}) => {
    return (
        <div className="container text-center">
            <h3>Welcome to VocationNations!</h3>
            <div className="vspacer-20"/>
            <img alt={"Hello"}
                 style={{width: "15%"}}
                 src="/images/onboarding/hello.png"/>
            <p className="lead w-50 mx-auto border-black pl-5 pr-5">
                Thank you very much for signing up to VocatioNations.
                Lets go through some steps so that we can refine your search and
                increase your chances for perfect matches!
            </p>
            <button className="btn btn-success"
                    onClick={() => setStepNumber(1)}>Get Started!
            </button>
        </div>
    );
}


const JobseekerOnboardingComponent = () => {

    const [stepNumber, setStepNumber] = useState(0);
    const [userReport, setUserReport] = useState(null);
    const [end, setEnd]               = useState(false);

    const advanceStep = (key, record) => {

        if (stepNumber < steps.length) {
            setUserReport(prev => {
                let new_obj  = {};
                new_obj[key] = record;
                return {...prev, ...new_obj}
            });
            setStepNumber((prev) => {
                return prev + 1;
            })
        } else {
            setEnd(true)
        }
    }

    useEffect(() => {
        console.log("UserReport: ", userReport)
    }, [stepNumber]);

    const steps = [
        {
            name     : 'Job Selection',
            component: <JobseekerOnboardingJobSelectionComponent
                advanceStep={advanceStep}/>
        },
        {
            name     : 'Skills Selection',
            component: <JobseekerOnboardingSkillsSelectionComponent
                advanceStep={advanceStep} userReport={userReport}/>
        },
        {
            name     : 'Culture Entry',
            component: <JobseekerOnboardingCultureEntryComponent
                advanceStep={advanceStep}/>
        }
    ]


    return (
        <div>
            <div className="container-fluid">
                <div className="vspacer-10"/>
                <div className="module-stepbar d-flex">
                    <ul className="steps six clearfix justify-content-center"
                        id="step-buttons">
                        {
                            steps.map((s, i) => {
                                return <li key={i}
                                           className={stepNumber === i + 1 ? 'active' : ''}><span
                                    className="step-no">{i + 1}</span>{s.name}
                                </li>
                            })
                        }
                    </ul>
                </div>
                <hr/>
                {
                    end &&
                    <div className="text-center">
                        Thank you for going through on-boarding. We will be in
                        touch
                        <br/>
                        <a href={"https://twitter.com/vocationnations"}><i
                            className="fa fa-twitter-square fa-3x text-primary"/></a>
                    </div>
                }
                {
                    !end && steps.map((r, i) => {
                        return stepNumber === i + 1 &&
                            <div key={i}>{r.component}</div>;
                    })
                }
                {
                    stepNumber === 0 &&
                    <OnBoardingMessage setStepNumber={setStepNumber}/>
                }
            </div>
        </div>
    );
}
export default JobseekerOnboardingComponent;
