import React, {useState} from 'react';
import {CultureSelectionTab} from './tabs';
import './vns-poc.css'


const SurveyorComponent = ({setRadialData}) => {

    const [stepNumber, setStepNumber] = useState(0);

    const [cultureInput, setCultureInput] = useState(null);

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
            name: 'Input culture',
            component: <CultureSelectionTab advanceStep={advanceStep}
                                            update={setCultureInput}
                                            setRadialData={setRadialData}
            />
        }
    ]

    return (
        <div className="container-fluid">
            <div className="vspacer-10"/>
            <div className="module-stepbar d-flex">
                <ul className="steps six clearfix justify-content-center" id="step-buttons">
                    {
                        steps.map((s, i) => {
                            return <li key={i}
                                       className={stepNumber === i ? 'active' : ''}><span
                                className="step-no">{i + 1}</span>{s.name}</li>
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
