import React from 'react';
import APP from "../../../../../app.constants";


const UserTypeSelectionSection = ({userType, update}) => {

    let jobseeker_class_list =
            userType !== APP.JobSeeker ? "btn btn-lg btn-outline-info mr-5 w-100" :
                "btn btn-lg btn-outline-info mr-5 w-100 active"
    let employer_class_list  =
            userType !== APP.Employer ? "btn btn-lg btn-outline-warning w-100" :
                "btn btn-lg btn-outline-warning w-100 active"

    return (
        <section className="userTypeSelectionSection p-0"
                 id="userTypeSelectionSection">
            <div className="container">
                <h1 className="text-center pt-5 pb-5">Who are you...</h1>

                <div className="vspacer-20"/>
                <div className="d-flex justify-content-center">
                    <button onClick={_ => {
                        update(APP.JobSeeker)
                    }} className={jobseeker_class_list}>
                        Job Seeker <br/>
                        <i className="fas fa-angle-double-down"/>
                    </button>
                    <button onClick={_ => update(APP.Employer)}
                            className={employer_class_list}>
                        Employer <br/>
                        <i className="fas fa-angle-double-down"/>
                    </button>
                </div>
            </div>
        </section>
    )

}

export default UserTypeSelectionSection;
