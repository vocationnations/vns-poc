import React, {useState} from 'react';
import JobSeekerOnBoardingService
    from "../../modules/user/onboarding/jobseeker/jobseeker-onboarding.service";
import {CultureSelectionTab} from "../../tabs";
import CultureRadialComponent
    from "../../modules/culture-radial/culture-radial.component";
import {useUser} from "../../modules/auth/context/user-provider";

const j_service = new JobSeekerOnBoardingService();

const StandaloneCultureEntryComponent = () => {

    const {userId} = useUser();

    const [radialData, setRadialData]     = useState([100, 100, 100, 100])
    const [_, setCultureInput] = useState(null);
    const [error, setError]               = useState('');


    const finalizeCultureEntry = (name, value) => {
        // get the string value of answer json object
        let value_copy = JSON.parse(JSON.stringify(value));
        value_copy.forEach((q) => delete q.answer.newState)


        let payload = {
            "adhocracy": radialData[0],
            "hierarchy": radialData[1],
            "clan"     : radialData[2],
            "market"   : radialData[3],
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
        window.location.href = '/a';


    }

    return (
        <div className="container-fluid">
            {error !== '' && <div className="alert alert-danger">{error}</div>}

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
    );
}

export default StandaloneCultureEntryComponent;
