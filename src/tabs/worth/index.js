import React, {useState} from 'react';

import './worthTab.css';

const WorthTab = ({advanceStep, update}) => {

    const [candidateBalance, setCandidateBalance] = useState({'skills': 50, 'culture': 50});
    const [employerBalance, setEmployerBalance] = useState({'skills': 50, 'culture': 50});

    const updateWorthBalance = (type, value) => {

        let skills_percent = parseInt(value);
        let culture_percent = 100 - skills_percent;

        switch (type) {
            case 'employer':
                setEmployerBalance({
                    'skills': skills_percent,
                    'culture': culture_percent
                })
                break;
            case 'candidate':
                setCandidateBalance({
                    'skills': skills_percent,
                    'culture': culture_percent
                })
                break;
            default:
                break;

        }
    }

    const saveWorth = () => {
        update(
            candidateBalance,
            employerBalance
        )
        advanceStep();
    }

    return (
        <div className="container">
            <div className="col-lg-12 row">
                <div className="col-lg-6">
                    <h3>Employer</h3>
                    <div className="form-group d-flex flex-column">

                        <div className="row">
                            <label className="mr-auto ml-3">Skills</label>
                            <label className="ml-auto mr-3">Culture</label>
                        </div>
                        <input className="worthSlider" type="range" min="0" max="100" value={employerBalance.skills}
                               onChange={(e) => updateWorthBalance('employer', e.target.value)}/>
                        <small className="form-text text-muted">What is your balance between skills and culture?</small>
                    </div>
                </div>
                <div className="col-lg-6">
                    <h3>Candidate</h3>
                    <div className="form-group d-flex flex-column">

                        <div className="row">
                            <label className="mr-auto ml-3">Skills</label>
                            <label className="ml-auto mr-3">Culture</label>
                        </div>
                        <input className="worthSlider" type="range" min="0" max="100"
                               value={candidateBalance.skills}
                               onChange={(e) => updateWorthBalance('candidate', e.target.value)}/>
                        <small className="form-text text-muted">What is your balance between skills and culture?</small>
                    </div>
                </div>
                <button className="btn btn-success" onClick={() => saveWorth()}>Next</button>
            </div>
        </div>
    )
}

export default WorthTab;
