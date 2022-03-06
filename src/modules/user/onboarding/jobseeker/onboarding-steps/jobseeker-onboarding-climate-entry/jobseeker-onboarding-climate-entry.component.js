import React, {useState} from 'react';
import JobSeekerOnBoardingService from "../../jobseeker-onboarding.service";
import {useUser} from "../../../../../auth/context/user-provider";
import ClimateQuestionsComponent
    from "../../../../../../components/climate-questions/climate-questions.component";

const j_service = new JobSeekerOnBoardingService()

j_service.getAllQuestionsAndSteps(
    (r) => {
        console.log(r)
    },
    (e) => {
        console.log(e)
    }
)

const default_questions = [
    {
        "id"   : 0,
        "title": "What is your salary expectation?",
        "steps": [
            {
                id: 1,
                number: 30000,
                label : '$30,000',
                question_id: 1,
            },
            {
                id: 2,
                number: 50000,
                label : '$30,000 - $50,000',
                question_id: 1,
            },
            {
                id: 3,
                number: 80000,
                label: '$50,000 - $80,000',
                question_id: 1
            },
            {
                id: 4,
                number: 100000,
                label: '> $100,000',
                question_id: 1
            },
        ]
    }
];

const JobseekerOnboardingClimateEntryComponent = ({advanceStep}) => {

    const {userId} = useUser();
    const [done, setDone] = useState(false)
    const [questions, setQuestions] = useState(default_questions)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2" />
                <div className="col-lg-8 text-center">
                    <ClimateQuestionsComponent
                        questions={questions}
                        setDone={setDone}
                    />
                    { done &&
                        <button onClick={() => advanceStep()} className="btn btn-success">Next</button>
                    }
                </div>
                <div className="col-lg-2" />
            </div>
        </div>
    );
}
export default JobseekerOnboardingClimateEntryComponent
