import React, {useEffect, useState} from 'react';
import AlgorithmService from "../../../user.service";

const algorithm_service = new AlgorithmService();

const ResultsTab = ({candidateSkills, candidateCulture, employerSkills, employerCulture, candidateWorth, employerWorth}) => {

  const [results, setResults] = useState('')
  const [error, setError] = useState('');

  useEffect(() => {
    const data = {
      worth: {
        candidate: {
          skills: candidateWorth.skills,
          culture: candidateWorth.culture
        },
        employer: {
          skills: employerWorth.skills,
          culture: employerWorth.culture
        }
      },
      candidate: {
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

    // update culture
    for (let key in employerCulture) { // for each question
      if(employerCulture.hasOwnProperty(key)) {
        for (let k1 in employerCulture[key]) { // for each domain
          if(employerCulture[key].hasOwnProperty(k1)) {
            data["employer"]["culture"][idx][k1] = employerCulture[key][k1]
          }
        }

        for (let k2 in candidateCulture[key]) { // for each domain
          if(candidateCulture[key].hasOwnProperty(k2)) {
            data["candidate"]["culture"][idx][k2] = candidateCulture[key][k2]
          }
        }
      }
      idx++;
    }

    // add skills
    data['candidate']['skills'] = candidateSkills
    data['employer']['skills'] = employerSkills

    algorithm_service.calculateScore(
        data,
        (res) => {
          setResults(res);
        },
        (err) => {
          setError('ERROR: Cannot fetch results: ' + err.message)
        }
    )
  },[])

  return (
      <div className="container">
      {
        error !== '' && <div className="alert alert-danger">{error}</div>
      }
          {results}
      </div>
  );
}


export default ResultsTab;
