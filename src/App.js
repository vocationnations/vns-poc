import React, {useState, useEffect} from 'react';
import yaml from 'js-yaml';
import './App.css';
import Question from './components/question';
import AlgorithmService from './service/algorithm';

import {
  IntroductionTab,
  CultureSelectionTab,
  SkillsSelectionTab,
  ResultsTab
} from './tabs';


const algorithm_service = new AlgorithmService();

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

  const [result, setResult] = useState('');
  const [finalData, setFinalData] = useState(null);

  useEffect(() => {
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
    algorithm_service.calculateScore(
        data,
        (res) => {
          setResult(res);
        },
        (err) => {
          console.log(err)
        }
    )

    setFinalData(data);

  },[])

  return (
    <div className="container">
      {
        result
      }
    </div>
  );
}


function App() {

  const [stepNumber, setStepNumber] = useState(0);

  const [candidateSkills,setCandidateSkills] = useState(null);
  const [candidateCulture, setCandidateCulture] = useState(null);

  const [employerSkills,setEmployerSkills] = useState(null);
  const [employerCulture, setEmployerCulture] = useState(null);

  const advanceStep = () => {
    setStepNumber((prev) => {
      return prev + 1;
    })
  }

  const steps = [
    { name: "Introduction", component: <IntroductionTab advanceStep={advanceStep} /> },
    { name: 'Candidate Skills', component: <SkillsSelectionTab advanceStep={advanceStep} update={setCandidateSkills} /> },
    { name: 'Candidate Culture', component: <CultureSelectionTab advanceStep={advanceStep} update={setCandidateCulture}/> },
    { name: 'Employer Skills', component: <SkillsSelectionTab advanceStep={advanceStep} update={setEmployerSkills}/> },
    { name: 'Employer Culture', component: <CultureSelectionTab advanceStep={advanceStep} update={setEmployerCulture} /> },
    { name: 'Results', component: <ResultsTab candidateSkills={candidateSkills} candidateCulture={candidateCulture} employerSkills={employerSkills} employerCulture={employerCulture} /> },
  ]

  return (
    <div className="container-fluid">
      <div className="vspacer-10" />
      <div className="module-stepbar d-flex">
        <ul className="steps six clearfix justify-content-center" id="step-buttons">
          {
            steps.map((s,i) => {
              return <li className={ stepNumber === i ? 'active' : '' }><span className="step-no">{i}</span>{s.name}</li>
            })
          }
        </ul>
      </div>
      <hr/>
      {
        steps.map((r,i) => {
          return stepNumber === i && r.component;
        })
      }

      {/*{ isDone == -1 && <Introduction /> }*/}
      {/*{ isDone == 0 && <Question question_data={questions[currentQuestion]} setScores={setCandidateScores} questionNumber={currentQuestion} advanceQuestion={advanceQuestion} /> }*/}
      {/*{ isDone == 1 && <button className="btn btn-danger" onClick={() => setIsDone(isDone + 1)}>Employer NOW</button> }*/}
      {/*{ isDone == 2 && <Question question_data={questions[currentQuestion]} setScores={setEmployerScores} questionNumber={currentQuestion} advanceQuestion={advanceQuestion} /> }*/}
      {/*{ isDone === 3 && <Result employerScores={employerScores} candidateScores={candidateScores}/> }*/}
    </div>
  );
}

export default App;
