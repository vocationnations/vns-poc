import React, {useState} from 'react';
import JobSeekerOnBoardingService
    from "../../modules/user/onboarding/jobseeker/jobseeker-onboarding.service";
import {CultureSelectionTab} from "../../tabs";
import CultureRadialComponent
    from "../../modules/culture-radial/culture-radial.component";
import {useUser} from "../../modules/auth/context/user-provider";
import {Link, useHistory} from "react-router-dom";

const j_service = new JobSeekerOnBoardingService();

const StandaloneCultureEntryComponent = () => {

    const {userId} = useUser();
    const history = useHistory()

    const [radialData, setRadialData] = useState([100, 100, 100, 100])
    const [_, setCultureInput]        = useState(null);
    const [error, setError]           = useState('');


    const finalizeCultureEntry = (name, value) => {
        // get the string value of answer json object
        let value_copy = JSON.parse(JSON.stringify(value));
        value_copy.forEach((q) => delete q.answer.newState)


        let payload = {
            "clan": radialData[0],
            "adhocracy": radialData[1],
            "market"     : radialData[2],
            "hierarchy"   : radialData[3],
            "user_id"  : userId
        }

        j_service.addCultureEntry(
            payload,
            (res) => {
                console.log(res);
            },
            (err) => {
                setError(err.message)
            }
        )
        history.push('/a');


    }

    return (
        <div className="container-fluid p-0">
            <div
                className="p-2 m-2 d-flex flex-row justify-content-between align-items-center p-3 mb-5 rounded z-depth-5" style={{border: "2px solid #CCC", boxShadow: "-4px 5px #666"}}>
                <Link to="/a">
                    <button className="btn btn-primary">
                        Go Back
                    </button>
                </Link>
                <div>
                    <h6 className="text-uppercase ">culture entry</h6>
                </div>
                <div/>
            </div>
            <div className="vspacer-20" />
            <div className="container-fluid">
                {error !== '' &&
                    <div className="alert alert-danger">{error}</div>}

                <div className="row">
                    <div className="col-lg-8">
                        <CultureSelectionTab
                            finalizeCultureEntry={finalizeCultureEntry}
                            update={setCultureInput}
                            setRadialData={setRadialData}/>
                    </div>
                    <div className="col-lg-4">
                        <CultureRadialComponent userSeries={radialData}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StandaloneCultureEntryComponent;
