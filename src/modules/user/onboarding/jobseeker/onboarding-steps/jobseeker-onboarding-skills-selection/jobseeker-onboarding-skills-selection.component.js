import React, {useEffect, useState} from 'react';
import AutoComplete
    from "../../../../../../components/autocomplete/autocomplete";
import OnBoardingService from "../../../onboarding.service";
import {useUser} from "../../../../../auth/context/user-provider";
import JobseekerOnboardingService from "../../jobseeker-onboarding.service";

const service   = new OnBoardingService();
const j_service = new JobseekerOnboardingService();

const ManualEntry = ({userId, advanceStep, setError}) => {

    const [skillName, setSkillName] = useState('');
    const [skills, setSkills]       = useState([]);

    const accumulateSkills = () => {
        const newSkills = [...skills];
        newSkills.push(skillName);
        setSkills(newSkills);
        setSkillName('');
    };

    const addManualSkills = () => {
        // create a payload for endpoint
        let payload = skills.map((s) => ({skill_name: s, user_id: userId}))

        j_service.createUserSkillManual(
            payload,
            (data) => {
                advanceStep("skills_manual", payload)
            },
            (err) => {
                setError(setError)
            }
        )
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="form-group col-xs-6">
                    <input onChange={(e) => setSkillName(e.target.value)}
                           defaultValue={skillName}
                           type="text"
                           placeholder={"Enter a skill"}
                           required className="form-control"/>
                </div>
                &nbsp;&nbsp;
                <div className="form-group col-xs-6">
                    <button className="btn btn-primary"
                            onClick={() => accumulateSkills()}>Add Skill
                    </button>
                </div>
            </div>
            <div className="vspacer-20"/>
            <div className="container">
                <h4>My skills</h4>
                {
                    skills.map((skill, idx) => {
                        return (
                            <div key={idx}>{skill}</div>
                        )
                    })
                }
            </div>
            <div className="vspacer-20"/>
            {skills.length > 0 &&
                <button className="btn btn-success"
                        onClick={() => addManualSkills()}>Next</button>
            }
        </div>
    )
}

const JobseekerOnboardingSkillsSelectionComponent =
          ({userReport, advanceStep}) => {

              const {userId} = useUser();

              const [listSuggestions, setListSuggestions]       = React.useState([]);
              const [loading, setLoading]                       = useState(false);
              const [selectedSkill, setSelectedSkill]           = useState(null);
              const [manualEntryEnabled, setManualEntryEnabled] = useState(false);
              const [error, setError]                           = useState('');

              useEffect(() => {
                  console.log(selectedSkill)
              }, [selectedSkill])

              useEffect(() => {
                  setLoading(true);
                  service.getSkillsByOccupationId(
                      userReport.job_selection.code,
                      (data) => {
                          setLoading(false);
                          if (data.element !== null) {
                              let suggestions = data.element.map(
                                  ({id, name}) => ({
                                      "code" : id,
                                      "title": name
                                  }));
                              setListSuggestions(suggestions);
                          } else {
                              setManualEntryEnabled(true);
                          }


                      },
                      (error) => {
                          console.log(error)
                          setLoading(false)
                      }
                  )
              }, [])

              const updateUserSkill = () => {
                  j_service.createUserSkill(selectedSkill.title, selectedSkill.code, userId, (data) => {
                      let obj = {
                          code   : selectedSkill.code,
                          title  : selectedSkill.title,
                          user_id: userId
                      }
                      advanceStep("skills_automatic", obj)
                  }, (error) => {
                      setError(error)
                  })
              }

              return (<div className="container-fluid text-center">
                  <h4>What kind of skills do you posses as
                      "{userReport.title}"?</h4>
                  <div className="vspacer-20"/>
                  {error !== '' &&
                      <div className="alert alert-danger">{error}</div>}
                  <div className="vspacer-20"/>
                  {selectedSkill && <button
                      className="btn btn-success"
                      onClick={() => updateUserSkill()}>Next Step</button>}
                  <div className="vspacer-20"/>
                  {manualEntryEnabled
                      ? <ManualEntry userId={userId} advanceStep={advanceStep}
                                     setError={setError}/>
                      : (<AutoComplete
                          loading={loading}
                          listSuggestions={listSuggestions}
                          setSelected={setSelectedSkill}/>)

                  }
              </div>);
          }
export default JobseekerOnboardingSkillsSelectionComponent;
