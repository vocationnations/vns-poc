import React, {useState} from 'react';

const SkillsSelectionTab = ({advanceStep, update}) => {

  const [skillNames, setSkillNames] = useState('');
  const [skillValues, setSkillValues] = useState('');

  const updateSkills = () => {
    const names_arr = skillNames.split(";")
    const values_arr = skillValues.split(";")

    let final_object = [];
    for(let i = 0; i < names_arr.length; i++){
      final_object.push({
        name: names_arr[i],
        value: parseInt(values_arr[i])
      })
    }
    update(final_object);
    advanceStep();
  }

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label>Skills</label>
          <input type="text" className="form-control" placeholder="Semi-colon separated skills" value={skillNames} onChange={(e) => setSkillNames(e.target.value)} />
          <small className="form-text text-muted"><i>e.g.,</i> Python;Java;Interpersonal</small>
        </div>
        <div className="form-group">
          <label>Values</label>
          <input type="text" className="form-control" placeholder="Semi-colon separated skills" value={skillValues} onChange={(e) => setSkillValues(e.target.value)} />
          <small className="form-text text-muted"><i>e.g.,</i> 40;50;60</small>
        </div>
      </form>
      <button className="btn btn-success" onClick={() => updateSkills()}>Next</button>
    </div>
  )
}

export default SkillsSelectionTab;
