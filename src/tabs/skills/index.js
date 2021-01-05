import React from 'react';

const SkillsSelectionTab = ({advanceStep, update}) => {
  return (
    <div className="container">
      <form>
        <div class="form-group">
          <label>Skills</label>
          <input type="text" class="form-control" placeholder="Semi-colon separated skills" />
          <small class="form-text text-muted"><i>e.g.,</i> Python;Java;Interpersonal</small>
        </div>
        <div class="form-group">
          <label>Values</label>
          <input type="text" class="form-control" placeholder="Semi-colon separated skills" />
          <small class="form-text text-muted"><i>e.g.,</i> 40;50;60</small>
        </div>
      </form>
      <button className="btn btn-success" onClick={() => advanceStep()}>Next</button>
    </div>
  )
}

export default SkillsSelectionTab;
