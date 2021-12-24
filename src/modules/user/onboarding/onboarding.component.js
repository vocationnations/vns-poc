import React, {useState} from 'react';

import AuthService from "../../auth/auth.service";
import {useHistory} from "react-router-dom";
import {
    OnBoardingClimateEntryComponent,
    OnBoardingCultureEntryComponent,
    OnBoardingJobSelectionComponent,
    OnBoardingSkillsSelectionComponent
} from "./steps/index"

const auth_service = new AuthService();

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
                We are very excited to have you on board. We would like to know
                a little bit more about you.
                Lets go through some steps so that we can refine your search and
                increase your chances for perfect matches!
            </p>
            <button className="btn btn-success"
                    onClick={() => setStepNumber(1)}>Get Started!
            </button>
        </div>
    );
}


const OnBoardingComponent = () => {

    const history = useHistory()

    const [stepNumber, setStepNumber] = useState(0);

    const advanceStep = () => {

        console.log("STEP NUMBER: " + stepNumber);
        if (stepNumber < steps.length) {
            setStepNumber((prev) => {
                return prev + 1;
            })
        }
    }

    const steps = [
        {
            name     : 'Job Selection',
            component: <OnBoardingJobSelectionComponent
                advanceStep={advanceStep}/>
        },
        {
            name     : 'Skills Selection',
            component: <OnBoardingSkillsSelectionComponent
                advanceStep={advanceStep}/>
        },
        {
            name     : 'Culture Entry',
            component: <OnBoardingCultureEntryComponent
                advanceStep={advanceStep}/>
        },
        {
            name     : 'Climate Entry',
            component: <OnBoardingClimateEntryComponent
                advanceStep={advanceStep}/>
        }
    ]


    const logout = () => {
        auth_service.userLogout();
        history.push('/')

    }

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
                    steps.map((r, i) => {
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
export default OnBoardingComponent;
