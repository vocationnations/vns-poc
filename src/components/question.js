import React, { useState} from 'react';


const Question = ({question_data, setScores, advanceQuestion, questionNumber}) => {
  const [buttonType, setButtonType] = useState('');


  const handleOptionSelect = (opt_type) => {
    setButtonType(opt_type);
  }

  const saveScore = (type) => {
    setScores(
      prev => ({
        ...prev,
        [String(questionNumber)]: {
          ...prev.[String(questionNumber)],
          [type]: 1
        }
      })
    )
    advanceQuestion();
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="text-center text-uppercase">{question_data.title}</h3>
        <hr />
        <h5 className="card-title text-center">{question_data.question}</h5>
        <div className="d-flex flex-column col-lg-5 mx-auto text-center">
          <button className="btn btn-info mb-2" onClick={() => handleOptionSelect("clan")}>{question_data.clan_option}</button>
          <button className="btn btn-info mb-2" onClick={() => handleOptionSelect("adhocracy")}>{question_data.adhocracy_option}</button>
          <button className="btn btn-info mb-2" onClick={() => handleOptionSelect("market")}>{question_data.market_option}</button>
          <button className="btn btn-info mb-2" onClick={() => handleOptionSelect("hierarchy")}>{question_data.hierarchy_option}</button>
        </div>
        <button className="btn btn-primary" onClick={() => saveScore(buttonType)}>Next</button>
      </div>
    </div>
  );
}

export default Question;
