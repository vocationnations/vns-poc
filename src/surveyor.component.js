import React, {useState} from 'react';
import {CultureSelectionTab, SkillsSelectionTab, WorthTab} from './tabs';
import './vns-poc.css'
import RegisterUserData from "./tabs/register-user-data/register-user-data";


const SurveyorComponent = () => {

    const [stepNumber, setStepNumber] = useState(1);

    const [skillsInput, setSkillsInput] = useState(null);
    const [cultureInput, setCultureInput] = useState(null);
    const [worthInput, setWorkflowInput] = useState(null);

    const advanceStep = () => {

        console.log("STEP NUMBER: " + stepNumber);

        if (skillsInput !== null && cultureInput !== null) {

        }

        if (stepNumber < steps.length) {
            setStepNumber((prev) => {
                return prev + 1;
            })
        }
    }

    const steps = [
        {
            name: 'Input skills',
            component: <SkillsSelectionTab advanceStep={advanceStep}
                                           update={setSkillsInput}/>
        },
        {
            name: 'Input culture',
            component: <CultureSelectionTab advanceStep={advanceStep}
                                            update={setCultureInput}/>
        },
        {
            name: "Worth",
            component: <WorthTab advanceStep={advanceStep}
                                 update={setWorkflowInput}/>
        },
        {
            name: "Thank you",
            component: <RegisterUserData skills={skillsInput}
                                         culture={cultureInput}
                                         worth={worthInput}/>
        }
    ]

    return (
        <div className="container-fluid">
            <div className="vspacer-10"/>
            <div className="module-stepbar d-flex">
                <ul className="steps six clearfix justify-content-center" id="step-buttons">
                    {
                        steps.map((s, i) => {
                            return <li key={i} className={stepNumber === i ? 'active' : ''}><span
                                className="step-no">{i}</span>{s.name}</li>
                        })
                    }
                </ul>
            </div>
            <hr/>
            {
                steps.map((r, i) => {
                    return stepNumber === i && <div key={i}>{r.component}</div>;
                })
            }
        </div>
    );
}

export default SurveyorComponent;
