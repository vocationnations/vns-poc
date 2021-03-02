import React, {useState} from 'react';
import './App.css';

import {CultureSelectionTab, IntroductionTab, ResultsTab, SkillsSelectionTab, WorthTab} from './tabs';

const App = () => {

    const [stepNumber, setStepNumber] = useState(0);

    const [candidateSkills, setCandidateSkills] = useState(null);
    const [candidateCulture, setCandidateCulture] = useState(null);

    const [employerSkills, setEmployerSkills] = useState(null);
    const [employerCulture, setEmployerCulture] = useState(null);

    const [candidateWorth, setCandidateWorth] = useState({});
    const [employerWorth, setEmployerWorth] = useState({});

    const updateWorth = (candidateWorth, employerWorth) => {
        setCandidateWorth(candidateWorth)
        setEmployerWorth(employerWorth)
    }

    const advanceStep = () => {
        console.log(candidateCulture)
        setStepNumber((prev) => {
            return prev + 1;
        })
    }

    const steps = [
        {name: "Introduction", component: <IntroductionTab advanceStep={advanceStep}/>},
        {
            name: 'Candidate Skills',
            component: <SkillsSelectionTab advanceStep={advanceStep} update={setCandidateSkills}/>
        },
        {
            name: 'Candidate Culture',
            component: <CultureSelectionTab advanceStep={advanceStep} update={setCandidateCulture}/>
        },
        {
            name: 'Employer Skills',
            component: <SkillsSelectionTab advanceStep={advanceStep} update={setEmployerSkills}/>
        },
        {
            name: 'Employer Culture',
            component: <CultureSelectionTab advanceStep={advanceStep} update={setEmployerCulture}/>
        },
        {name: 'Culture & Skills Worth', component: <WorthTab advanceStep={advanceStep} update={updateWorth}/>},
        {
            name: 'Results',
            component: <ResultsTab candidateSkills={candidateSkills} candidateCulture={candidateCulture}
                                   employerSkills={employerSkills} employerCulture={employerCulture}
                                   candidateWorth={candidateWorth} employerWorth={employerWorth}
            />
        },
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

export default App;
