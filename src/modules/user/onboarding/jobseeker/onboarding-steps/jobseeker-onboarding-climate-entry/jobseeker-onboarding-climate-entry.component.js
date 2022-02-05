import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ClimateQuestionsComponent
    from "../../../../../../components/climate-questions/climate-questions.component";

const codeNumber = (x) => {
    return Math.log(x / (1 - x  ))
}

const default_questions = [
    {
        "question": "What is your salary expectation?",
        "steps"   : [
            {
                number: 30000,
                label: '$30,000',
            },
            {
                number: 50000,
                label: '$30,000 - $50,000',
            },
            {
                number: 80000,
                label: '$50,000 - $80,000',
            },
            {
                number: 100000,
                label: '> $100,000',
            },
        ]
    }
];

const JobseekerOnboardingClimateEntryComponent = () => {

    const [climateQuestions, setClimateQuestions] = useState(default_questions);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2"/>
                <div className="col-lg-8 text-center">
                    <ClimateQuestionsComponent questions={climateQuestions} />
                </div>
                <div className="col-lg-2"/>
            </div>
        </div>
    );
}
export default JobseekerOnboardingClimateEntryComponent;
