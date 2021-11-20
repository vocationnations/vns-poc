import React from 'react';
import APP from "../../../../../app.constants";
import JobSeekerPitch from "./job-seeker/job-seeker.pitch";
import EmployerPitch from "./employer/employer.pitch";

const SalesPitchSection = ({userType}) => {

    if(userType === APP.JobSeeker) {
        return (
            <section className="salesPitchSection p-0">
                <JobSeekerPitch />
            </section>
        );
    } else {
        return (
            <section className="salesPitchSection p-0">
                <EmployerPitch />
            </section>
        );
    }


}
export default SalesPitchSection;
