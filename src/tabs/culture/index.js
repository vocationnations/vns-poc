import React from 'react';

const CultureSelectionTab = ({advanceStep}) => {
  return (
    <div className="container">
        <button className="btn btn-success" onClick={() => advanceStep()}>Next</button>
    </div>
  )
}

export default CultureSelectionTab;
