import React, {useEffect, useState} from 'react';
import Questions from '../../components/questions';

const CultureSelectionTab = ({finalizeCultureEntry, update, setRadialData}) => {
  const [done, setDone]           = useState(false);
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    if (done) {
      update(finalData);
    }
  }, [done])

  return (
      <div className="container-fluid text-center">
        <Questions setDone={setDone} setFinalData={setFinalData}
                   setRadialData={setRadialData}/>
        {done && <button className="btn btn-success"
                         onClick={() => finalizeCultureEntry("culture_entry", finalData)}>Next</button>}
      </div>
  )
}

export default CultureSelectionTab;
