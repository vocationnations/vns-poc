import React, {useState} from 'react';
import CultureRadialComponent
    from "../../../../../culture-radial/culture-radial.component";
import {CultureSelectionTab} from "../../../../../../tabs";
import JobSeekerOnBoardingService from "../../jobseeker-onboarding.service";
import {useUser} from "../../../../../auth/context/user-provider";

const j_service = new JobSeekerOnBoardingService()

const JobseekerOnboardingCultureEntryComponent = ({advanceStep}) => {

    const {userId} = useUser();

    const [radialData, setRadialData]     = useState([100, 100, 100, 100])
    const [cultureInput, setCultureInput] = useState(null);
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
            () => {
                advanceStep("culture_entry",
                    {
                        radial_data  : radialData,
                        detailed_data: value_copy
                    }
                )
            },
            (err) => {
                setError(err.message)
            }
        )


    }

    return (
        <div className="container-fluid border-black">
            {error != '' && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                <div className="col-lg-8 border-red">
                    <CultureSelectionTab
                        finalizeCultureEntry={finalizeCultureEntry}
                        update={setCultureInput}
                        setRadialData={setRadialData}/>
                </div>
                <div className="col-lg-4 border-green">
                    <CultureRadialComponent userSeries={radialData}/>
                </div>
            </div>
        </div>
    );
}
export default JobseekerOnboardingCultureEntryComponent
