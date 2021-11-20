import React, {useState} from 'react';
import APP from "../../../../../app.constants";


const UserTypeSelectionSection = ({update}) => {

    return (
        <section className="userTypeSelectionSection p-0">
            <div className="container">
                <h1 className="text-center pt-5 pb-5">Who are you...</h1>

                <div className="vspacer-20" />
                <div className="d-flex justify-content-center">
                    <button  onClick={e => update(APP.JobSeeker)} className="btn btn-lg btn-secondary mr-5">Job Seeker</button>
                    <button onClick={e => update(APP.Employer)} className="btn btn-lg btn-secondary">Employer</button>
                </div>
            </div>
        </section>
    )

}

export default UserTypeSelectionSection;
