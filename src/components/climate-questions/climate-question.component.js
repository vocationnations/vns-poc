import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const ClimateQuestionComponent = ({
                                      question_data,
                                      advanceQuestion,
                                      setAnswer
                                  }) => {

    const [value, setValue]                   = useState(0);
    const [internalAnswer, setInternalAnswer] = useState(-1);

    useEffect(() => {
        // create a value field for intervals for slider
        let steps_len = question_data.steps.length - 1
        console.log(steps_len)
        question_data.steps.forEach((s, i) => {
            question_data.steps[i]["value"] = (100 / steps_len) * (i)
        })
    }, [question_data])


    const nextQuestion = () => {
        setAnswer(internalAnswer)
        advanceQuestion()
    }

    const handleSetAnswer = (number) => {
        setInternalAnswer((number * question_data.steps.length) / 100)
    }


    return (
        <div className="container">
            <h4>{question_data.title}</h4>
            <Box>
                <Slider
                    aria-label="Restricted values"
                    defaultValue={question_data.steps[0]["value"]}
                    step={null}
                    value={value}
                    onChange={(e, n) => handleSetAnswer(n)}
                    valueLabelDisplay="off"
                    marks={question_data.steps}
                />
            </Box>
            <br/>
            <button className="btn btn-primary align-self-center"
                    onClick={() => nextQuestion()}>Next
            </button>
        </div>
    );
}
export default ClimateQuestionComponent;
