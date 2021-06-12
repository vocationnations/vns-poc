import React, {useEffect, useState} from 'react';
import Questions from '../../components/questions';

const CultureSelectionTab = ({advanceStep,update}) => {
  const [done, setDone] = useState(false);
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    if(done) {
      update(finalData);
    }
  },[done])

  return (
      <div className="container-fluid">
        <Questions setDone={setDone} setFinalData={setFinalData}/>
        {done && <button className="btn btn-success"
                         onClick={() => advanceStep()}>Next</button>}
      </div>
  )
}

export default CultureSelectionTab;
