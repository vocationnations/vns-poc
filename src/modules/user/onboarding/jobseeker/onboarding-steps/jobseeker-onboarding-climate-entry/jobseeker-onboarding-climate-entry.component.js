import React, {useEffect, useState} from 'react';
import ClimateQuestionsComponent
    from "../../../../../../components/climate-questions/climate-questions.component";
import {useUser} from "../../../../../auth/context/user-provider";
import JobseekerOnboardingService from "../../jobseeker-onboarding.service";

const codeNumber = (x) => {
    return Math.log(x / (1 - x))
}

const j_service = new JobseekerOnboardingService();

// j_service.getAllQuestionsAndSteps();

const default_questions = [
    {
        "id"   : 0,
        "title": "What is your salary expectation?",
        "steps": [
            {
                number: 30000,
                label : '$30,000',
            },
            {
                number: 50000,
                label : '$30,000 - $50,000',
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

const JobseekerOnboardingClimateEntryComponent = ({advanceStep}) => {

    const {userId} = useUser();

    const [climateQuestions, setClimateQuestions] = useState(default_questions);
    const [error, setError]                       = useState('')

    const finalizeClimateEntry = (name, value) => {
        // get the string value of answer json object
        let value_copy = JSON.parse(JSON.stringify(value));
        value_copy.forEach((q) => delete q.answer.newState)


        // advanceStep("culture_entry",
        //     {
        //         radial_data  : radialData,
        //         detailed_data: value_copy
        //     }
        // )
    }

    useEffect(() => {
        console.log("TETS")
        console.log(JSON.stringify(climateQuestions))
    }, [climateQuestions])

    return (
        <div className="container-fluid">
            <div className="alert alert-danger">SUP</div>
            <div className="row">
                <div className="col-lg-2"/>
                <div className="col-lg-8 text-center">
                    {climateQuestions != null &&
                        <ClimateQuestionsComponent questions={climateQuestions}
                                                   finalizeClimateEntry={finalizeClimateEntry}/>}
                </div>
                <div className="col-lg-2"/>
            </div>
        </div>
    );
}
export default JobseekerOnboardingClimateEntryComponent;
