import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import question from "../question";
import {useUser} from "../../modules/auth/context/user-provider";
import JobSeekerOnBoardingService
    from "../../modules/user/onboarding/jobseeker/jobseeker-onboarding.service";

const j_service = new JobSeekerOnBoardingService();

const ClimateQuestionComponent = ({
                                      question_data,
                                      advanceQuestion,
                                  }) => {

    const [answer, setAnswer] = useState(question_data.steps[0]["id"])
    const [errorMessage, setErrorMessage] = useState("")

    const { userId } = useUser();

    useEffect(async () => {
        // create a value field for intervals for slider
        let steps_len = question_data.steps.length - 1
        await question_data.steps.forEach((s, i) => {
            question_data.steps[i]["value"] = (100 / steps_len) * (i)
        })

        handleSetAnswer(question_data.steps[0]["value"])

    }, [question_data])

    const handleSetAnswer = (n) => {
        let idx = ((n * (question_data.steps.length-1)) / 100)
        setAnswer(
            question_data.steps[idx]["id"]
        )

    }

    const nextQuestion = () => {
        j_service.addClimateAnswer(
            {
                "question_id":question_data.id,
                "step_id": answer,
                "user_id": userId
            },
            (r) => {
                console.log(r)
                advanceQuestion()

            },
            (e) => {
                setErrorMessage(e.message)
            }
        )

    }


    return (
        <div className="container text-center col-lg-12">
            <div className="justify-content-center">
                <h4>{question_data.title}</h4>
                { errorMessage !== "" &&
                    <div className="alert alert-danger">Error recording answer! Please try again later!</div>
                }
                <Box>
                    <Slider
                        aria-label="Restricted values"
                        defaultValue={question_data.steps[0]["value"]}
                        step={null}
                        onChange={(e,n) => handleSetAnswer(n)}
                        valueLabelDisplay="off"
                        marks={question_data.steps}
                    />
                </Box>
                <button className="btn btn-primary align-self-center"
                        onClick={() => {nextQuestion()}}>Next
                </button>
            </div>
        </div>
    );
}
export default ClimateQuestionComponent;
