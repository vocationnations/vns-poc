import React, {useEffect, useState} from 'react';
import Question from './question/index';

const questions = [
  {
    title: "Management styles",
    question: "The financial report indicates that one team has consistently failed to meet its objectives. What should be done?",
    clan_option: "Meet with the department members and figure out what resources and supports they need in order to succeed", //collaborate
    adhocracy_option: "The old method clearly wasn't working. Encourage the team to brainstorm new solutions and let them get started", //create
    market_option: "Close the project and reallocate resources to more productive teams", //compete
    hierarchy_option: "Provide them with step-by-step instructions and checklists, and set deadlines for each milestone", //control
  },
  {
    title: "Internal Flexibility",
    question: "An employee has arrived late several times this week. What should their manager be thinking about?",
    clan_option: "This employee could be going through some personal struggles right now → perhaps they need support",
    adhocracy_option: "Perhaps we should reconsider our policies about starting and leaving on-time. A more flexible approach may be better.",
    market_option: "This employee is usually a hard worker → if they continue to be highly productive, perhaps we can simply ignore some late days every now and then.",
    hierarchy_option: "Company policies about starting and leaving work on-time apply to everyone → our best course of action is to stick to the policy. No exceptions.",
  },
  {
    title: "Communication styles",
    question: "A coworker you have known for a long time is moving away and getting a new job. How do you get the news?",
    clan_option: "The team is like a family. The coworker shared this information with the team long before the official announcement was made.",
    adhocracy_option: "You find out in the usual way. You will miss them, however you are excited to find out who will replace them. New people means new ideas, resources, and opportunities",
    market_option: "You find out immediately because you've been eagerly waiting for the opportunity to move up in the organization",
    hierarchy_option: "You get the news in a company memo, along with an update about when their position will be filled.",
  },
  {
    title: "Acknowledgment and reinforcement",
    question: "The team successfully completed a very important project. What happens next?",
    clan_option: "Your boss buys lunch for the whole team to celebrate together.",
    adhocracy_option: "We are excited about the creative approach that was used in this project. Key players are invited to share their thought process with the executive team.",
    market_option: "The boss briefly thanks the whole team for their work. Those who had the biggest impact get a bonus",
    hierarchy_option: "Let's identify and acknowledge our successes so that in the future we can do this faster and easier",
  },
  {
    title: "Workforce empowerment",
    question: "As the leader of a new department, how do you maximize group engagement?",
    clan_option: "Take the group out for lunch. If we connect on a personal level this team will be empowered to do great things!",
    adhocracy_option: "Create an opportunity for everyone to brainstorm and contribute new ideas. A new department needs new ideas",
    market_option: "I will state our objectives clearly and remind the team that our competitors are working hard to overtake us",
    hierarchy_option: "I will make our system as efficient as possible, empowering employees to perform effectively and make the best decisions",
  },
  {
    title: "Management styles",
    question: "My favorite boss is one who...",
    clan_option: "Puts the wellbeing and job satisfaction of the team at the forefront",
    adhocracy_option: "Encourages me to think outside the box and come up with unique solutions",
    market_option: "Recognizes the value of high-performers and empowers them to succeed",
    hierarchy_option: "Identifies bottlenecks in the system and will simplify and automate as much as possible",
  },
  {
    title: "Acknowledgment and reinforcement",
    question: "Some employees are being promoted. Which employees should be selected?",
    clan_option: "Those who bring out the best in others and will put the team ahead of themselves.",
    adhocracy_option: "Those who consistently introduce new ideas and clever solutions.",
    market_option: "Those who would be the most difficult to replace if they ever leave the company",
    hierarchy_option: "Those who have been the most diligent and consistent in carrying out their duties",
  },
  {
    title: "Workforce empowerment",
    question: "Several employees are approaching you every day with suggestions and ideas for the organization. What do you do?",
    clan_option: "You have an open-door policy. It is important to listen to every employee so that they feel like a valued member of the team.",
    adhocracy_option: "We must listen to every new suggestion! Great ideas can come from anyone at any time, and we must always be ready for them",
    market_option: "You are always interested in ideas that increase productivity or cut costs. As long as performance remains high, employees are encouraged to share suggestions.",
    hierarchy_option: "We have a process for submitting suggestions so all decision-makers can review them. You explain this process to the employees",
  }
];

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
