import React, {useEffect, useState} from 'react';
import JobSeekerOnBoardingService from "../../jobseeker-onboarding.service";
import {useUser} from "../../../../../auth/context/user-provider";
import ClimateQuestionsComponent
    from "../../../../../../components/climate-questions/climate-questions.component";

const j_service = new JobSeekerOnBoardingService()

const default_questions = [];

const JobseekerOnboardingClimateEntryComponent = ({advanceStep}) => {

    const {userId} = useUser();
    const [done, setDone] = useState(false)
    const [questions, setQuestions] = useState(default_questions)

    useEffect(() => {
        j_service.getAllQuestionsAndSteps(
            (r) => {
                console.log("QUESTIONS!")
                console.log(r)
                setQuestions(r)
            },
            (e) => {
                console.log(e)
            }
        )
    },[])

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
