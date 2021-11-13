import React, {useEffect, useState} from 'react';
import Question from './question/index';


const questions = [
  {
    title: "Organizational Leadership",
    question: "Do you prefer leaders who...",
    clan_option: "Regularly offer mentorship for employees.",
    adhocracy_option: "Are willing to take risks.",
    market_option: "Never quit, never back down, never give up.",
    hierarchy_option: "Sticks to the plan and never misses a deadline.",
  },
  {
    title: "Organizational Glue",
    question: "Do you prefer organizational values which...",
    clan_option: "Emphasize community and trust within the organization.",
    adhocracy_option: "Emphasize innovation and new solutions.",
    market_option: "Emphasize the importance of winning at all costs.",
    hierarchy_option: "Emphasize planning and thinking ahead.",
  },
  {
    title: "Strategic Emphases",
    question: "Do you prefer organizations that prioritize...",
    clan_option: "Good working relationships between coworkers, and professional development opportunities.",
    adhocracy_option: "Creative problem-solving, and development of novel products and services.",
    market_option: "Achievement of difficult goals and winning in a competitive marketplace.",
    hierarchy_option: "Wise company policy, clear paths to advancement, and smooth, efficient operations.",
  },
  {
    title: "Criteria of Success",
    question: "Do you prefer organizations that believe their success comes from...",
    clan_option: "Hiring and developing good people.",
    adhocracy_option: "Innovation, change, and risk-taking.",
    market_option: "Being competitive and dominating their market.",
    hierarchy_option: "Efficient processes and advance planning.",
  },
  {
    title: "Dominant Characteristics",
    question: "Do you prefer an oreganization that is...",
    clan_option: "A very personal place. It is like an extended family. People seem to share a lot of themselves",
    adhocracy_option: "A very dynamic and entrepreneurial place. People are willing to stick their necks out and take risks.",
    market_option: "Very results oriented. A major concern is with getting the job done. People are very competitive and achievement oriented.",
    hierarchy_option: "A very controlled and structured place. Formal procedures generally govern what people do.",
  },
  {
    title: "Management of employees",
    question: "Do you prefer Management styles that are chracterized by...",
    clan_option: "Teamwork, consensus, and participation.",
    adhocracy_option: "Individual risk-taking, innovation, freedom, and uniqueness.",
    market_option: "Hard-driving competitiveness, high demands, and achievement.",
    hierarchy_option: "Security of employment, conformity, predictability, and stability in relationships.",
  }
]

const Questions = ({setDone, setFinalData, setRadialData}) => {
  const [questionNumber, setQuestionNumber]   = useState(0);
  const [numericalScores, setNumericalScores] = useState({
    "adhocracy": 0, "hierarchy": 0, "clan": 0, "market": 0
  })

  const advanceQuestion = () => {

    if (questions.length - 1 === questionNumber) {
      setDone(true);
    }
    setQuestionNumber((prev) => {
      return prev += 1
    })

  }

  useEffect(() => {
    console.log(numericalScores);

    let raw_numerical_scores = Object.values(numericalScores)
    console.log(raw_numerical_scores)
    let final_radial_scores = []
    console.log(questionNumber)
    for (let i = 0, length = raw_numerical_scores.length; i < length; i++) {
      final_radial_scores[i] = raw_numerical_scores[i] / questionNumber;
    }
    console.log(final_radial_scores)
    setRadialData(final_radial_scores)

  }, [numericalScores])

  return (
      <div className="">
        {
          questions.length > questionNumber ? (
              <Question question_data={questions[questionNumber]}
                        setData={setFinalData} advanceQuestion={advanceQuestion}
                        questionNumber={questionNumber}
                        setNumericalScores={setNumericalScores}
              />
          ) : (
              <div>Finished answering candidate questions! Proceed to next step!<br/><br/>
              </div>
          )
        }
      </div>
  )
}

export default Questions;
