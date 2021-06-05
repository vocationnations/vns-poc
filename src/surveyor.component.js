import React, {useState} from 'react';
import {CultureSelectionTab, ResultsTab, SkillsSelectionTab, WorthTab} from './tabs';
import './vns-poc.css'



const SurveyorComponent = () => {

    const [stepNumber, setStepNumber] = useState(0);

    const [skillsInput, setSkillsInput] = useState(null);
    const [cultureInput, setCultureInput] = useState(null);

    const [candidateWorth, setCandidateWorth] = useState({});
    const [employerWorth, setEmployerWorth] = useState({});

    const updateWorth = (candidateWorth, employerWorth) => {
        setCandidateWorth(candidateWorth)
        setEmployerWorth(employerWorth)
    }

    const advanceStep = () => {

        if(skillsInput == null || cultureInput == null) {
            setStepNumber((prev) => {
                return prev + 1;
            })
        } else {
            console.log(skillsInput)
            console.log(cultureInput)
        }

    }

    const steps = [
        {
            name: 'Input skills',
            component: <SkillsSelectionTab advanceStep={advanceStep} update={setSkillsInput}/>
        },
        {
            name: 'Input culture',
            component: <CultureSelectionTab advanceStep={advanceStep} update={setCultureInput}/>
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
