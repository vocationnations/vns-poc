import React from 'react';
import './jobseeker-dashboard.component.css'
import JobSeekerDashboardRoutesComponent
    from "./route-jobseeker-dashboard/route-jobseeker-dashboard.component";
import {Link} from "react-router-dom";

const JobseekerDashboardComponent = () => {


    return (
        <div className="container-fluid p-0 d-flex flex-column">
            <div
                className="p-2 border-black d-flex flex-row justify-content-between">
                <Link to="/a">
                    <button className="btn btn-primary">
                       Go Back
                    </button>
                </Link>
                <div>
                    <h6 className="text-uppercase">culture entry</h6>
                </div>
                <div/>
            </div>
            <div className="vspacer-20"/>
            <JobSeekerDashboardRoutesComponent/>
        </div>
    )
}

export default JobseekerDashboardComponent;
