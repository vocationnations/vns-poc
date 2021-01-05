import React from 'react';

const IntroductionTab = ({advanceStep}) => {

  return (
    <div className="container">
      <button className="btn btn-success" onClick={() => advanceStep()}>Start</button>
    </div>
  )
}

export default IntroductionTab;
