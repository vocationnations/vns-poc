import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const ClimateQuestionComponent = ({question_data, setQuestionNumber}) => {

    useEffect(() => {
        console.log(question_data)
        // create a value field for intervals for slider
        let steps_len = question_data.steps.length-1
        question_data.steps.forEach((s,i) => {
            question_data.steps[i]["value"] = (100/steps_len) * (i)
        })
    },[question_data])

    const advanceQuestion = () => {
        setQuestionNumber((prev) => prev + 1)
    }


    return (
        <div className="container border-black">
            <h4>{question_data.question}</h4>
            <Box>
                <Slider
                    aria-label="Restricted values"
                    defaultValue={question_data.steps[0]["value"]}
                    step={null}
                    valueLabelDisplay="off"
                    marks={question_data.steps}
                />
            </Box>
            <br />
            <button className="btn btn-primary align-self-center" onClick={() => advanceQuestion()}>Next</button>
        </div>
    );
}
export default ClimateQuestionComponent;
