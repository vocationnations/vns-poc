import React, {useState} from 'react';
import CultureRadialComponent
    from "../../../../../culture-radial/culture-radial.component";
import {CultureSelectionTab} from "../../../../../../tabs";

const JobseekerOnboardingCultureEntryComponent = ({advanceStep}) => {

    const [radialData, setRadialData]     = useState([100, 100, 100, 100])
    const [cultureInput, setCultureInput] = useState(null);

    const finalizeCultureEntry = (name, value) => {
        // get the string value of answer json object
        let value_copy = JSON.parse(JSON.stringify(value));
        value_copy.forEach((q) => delete q.answer.newState)

        console.log(JSON.stringify(value_copy))

        advanceStep("culture_entry",
            {
                radial_data  : radialData,
                detailed_data: value_copy
            }
        )
    }

    return (
        <div className="container-fluid border-black">
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
