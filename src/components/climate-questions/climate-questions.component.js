import React, {useState} from 'react'
import ClimateQuestionComponent from "./climate-question.component";

const ClimateQuestionsComponent = ({
                                       setDone,
                                       questions
                                   }) => {

    const [questionNumber, setQuestionNumber] = useState(0);

    const advanceQuestion = () => {
        if (questions.length - 1 === questionNumber) {
            setDone(true);
        }
        setQuestionNumber((prev) => {
            return prev += 1
        })

    }

    return (

        questions.length > questionNumber ? (
            <>
                <ClimateQuestionComponent
                    question_data={questions[questionNumber]}
                    advanceQuestion={advanceQuestion} />
            </>
        ) : (
            <div className="text-center">
                <p className="lead">Finished answering all questions! Proceed further!</p>
                <br />
            </div>
        )
    )
}
export default ClimateQuestionsComponent;
