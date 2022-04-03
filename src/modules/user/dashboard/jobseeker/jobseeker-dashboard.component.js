import React from 'react';
import './jobseeker-dashboard.component.css'
import JobSeekerDashboardRoutesComponent
    from "./route-jobseeker-dashboard/route-jobseeker-dashboard.component";

const JobseekerDashboardComponent = () => {


    return (
        <div className="container-fluid p-0 d-flex flex-column">
            <JobSeekerDashboardRoutesComponent/>
        </div>
    )
}

export default JobseekerDashboardComponent;
