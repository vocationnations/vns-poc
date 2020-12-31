import React, {useState} from 'react';
import yaml from 'js-yaml';
import './App.css';

import Question from './components/question';

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
    question: "Do you prefer Do you prefer an oreganization that is...",
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

const Result = ({employerScores, candidateScores}) => {

  const createYAML = () => {

    const data = {
      worth: {
        skills: 60,
        culture: 40,
      },
      candidate: {
        skills: [
          {
            name: "Python",
            value: 70
          }
        ],
        culture: [
          {
            hierarchy: 0,
            market: 0,
            adhocracy: 0,
            clan: 0
          },
          {
            hierarchy: 0,
            market: 0,
            adhocracy: 0,
            clan: 0
          },
          {
            hierarchy: 0,
            market: 0,
            adhocracy: 0,
            clan: 0
          },
          {
            hierarchy: 0,
            market: 0,
            adhocracy: 0,
            clan: 0
          },
          {
            hierarchy: 0,
            market: 0,
            adhocracy: 0,
            clan: 0
          },
          {
            hierarchy: 0,
            market: 0,
            adhocracy: 0,
            clan: 0
          },
        ]
      },
      employer: {
        skills: [
          {
            name: "Python",
            value: 70
          }
        ],
        culture: [
          {
            hierarchy: 0,
            market: 0,
            adhocracy: 0,
            clan: 0
          },
          {
            hierarchy: 0,
            market: 0,
            adhocracy: 0,
            clan: 0
          },
          {
            hierarchy: 0,
            market: 0,
            adhocracy: 0,
            clan: 0
          },
          {
            hierarchy: 0,
            market: 0,
            adhocracy: 0,
            clan: 0
          },
          {
            hierarchy: 0,
            market: 0,
            adhocracy: 0,
            clan: 0
          },
          {
            hierarchy: 0,
            market: 0,
            adhocracy: 0,
            clan: 0
          },
        ]
      }
    }



    let culture = [];
    let idx = 0;
    for (let key in employerScores) { // for each question
      if(employerScores.hasOwnProperty(key)) {
          for (let k1 in employerScores[key]) { // for each domain
            if(employerScores[key].hasOwnProperty(k1)) {
              data["employer"]["culture"][idx][k1] = employerScores[key][k1]
            }
          }

          for (let k2 in candidateScores[key]) { // for each domain
            if(candidateScores[key].hasOwnProperty(k2)) {
              data["candidate"]["culture"][idx][k2] = candidateScores[key][k2]
            }
          }
      }
      idx++;
    }

    let yamlStr = yaml.safeDump(data);
    console.log(yamlStr);

  }

  createYAML();

  return (
    <div className="container">
      HEY RESULT PLEASE!
    </div>
  );
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [candidateScores, setCandidateScores] = useState({});
  const [employerScores, setEmployerScores] = useState({});

  const [isDone, setIsDone] = useState(0);

  const q_dat = questions[currentQuestion]

  const advanceQuestion = () => {
    if(currentQuestion+1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsDone(isDone + 1);
      setCurrentQuestion(0);
    }
  }

  if(isDone === 0 || isDone === 1){
    console.log(candidateScores)
  } else if(isDone === 2 || isDone === 3) {
    console.log(employerScores);
  }

  return (
    <div className="container">
      <div className="vspacer-10" />
      { isDone == 0 && <Question question_data={questions[currentQuestion]} setScores={setCandidateScores} questionNumber={currentQuestion} advanceQuestion={advanceQuestion} /> }
      { isDone == 1 && <button className="btn btn-danger" onClick={() => setIsDone(isDone + 1)}>Employer NOW</button> }
      { isDone == 2 && <Question question_data={questions[currentQuestion]} setScores={setEmployerScores} questionNumber={currentQuestion} advanceQuestion={advanceQuestion} /> }
      { isDone === 3 && <Result employerScores={employerScores} candidateScores={candidateScores}/> }
    </div>
  );
}

export default App;
