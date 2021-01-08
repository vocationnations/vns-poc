import React, {useState, useEffect} from 'react';
import Questions from '../../components/questions';

const CultureSelectionTab = ({advanceStep,update}) => {
  const [done, setDone] = useState(false);
  const [scores,setScores] = useState({});

  useEffect(() => {
    if(done) {
      update(scores);
    }
  },[done])

  return (
    <div className="container">
        <Questions setDone={setDone} setScores={setScores}/>
        { done && <button className="btn btn-success" onClick={() => advanceStep()}>Next</button> }
    </div>
  )
}

export default CultureSelectionTab;
