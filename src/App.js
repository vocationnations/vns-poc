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



const App = () => {

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
    </div>
  );
}

export default App;
