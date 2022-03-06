import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import question from "../question";
import {useUser} from "../../modules/auth/context/user-provider";

const ClimateQuestionComponent = ({
                                      question_data,
                                      advanceQuestion,
                                  }) => {

    const [answer, setAnswer] = useState(question_data.steps[0]["id"])

    const { userId } = useUser();

    useEffect(() => {
        // create a value field for intervals for slider
        let steps_len = question_data.steps.length - 1
        question_data.steps.forEach((s, i) => {
            question_data.steps[i]["value"] = (100 / steps_len) * (i)
        })
    }, [question_data])

    const marks = [
        {
            number: 1012,
            value: 0,
            label: '0°C',
        },
        {
            number: 1012,
            value: 20,
            label: '20°C',
        },
        {
            number: 1012,
            value: 37,
            label: '37°C',
        },
        {
            number: 1012,
            value: 100,
            label: '100°C',
        },
    ];

    const handleSetAnswer = (n) => {
        let idx = ((n * (question_data.steps.length-1)) / 100)
        setAnswer(
            question_data.steps[idx]["id"]
        )

    }

    const nextQuestion = () => {
        console.log("Answer: " + answer)

        // update the database
        //  -> step_id = answer
        //  -> question_id = question_data.id
        //  -> userId

        // go to the next question
        advanceQuestion()
    }


    return (
        <div className="container text-center col-lg-12">
            <div className="justify-content-center">
                <h4>{question_data.title}</h4>
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
                        onClick={() => nextQuestion()}>Next
                </button>
            </div>
        </div>
    );
}
export default ClimateQuestionComponent;
