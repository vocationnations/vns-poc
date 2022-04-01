import React from 'react';
import StandaloneCultureEntryComponent
    from "../../../../../components/stand-alone-culture-entry/stand-alone-culture-entry.component";
import {Route, browserHistory, Router, Switch} from "react-router-dom";
import JobseekerDashboardMainComponent
    from "../main-jobseeker-dashboard/main-jobseeker-dashboard.component";

const JobseekerDashboardRoutes = [
    {
        name     : "Job Seeker Dashboard Main",
        path     : "/a",
        exact    : true,
        component: <JobseekerDashboardMainComponent/>
    },
    {
        name     : "Culture Entry",
        path     : "/a/dashboard/jobseeker/culture",
        exact    : true,
        component: <StandaloneCultureEntryComponent/>
    }
]

const JobSeekerDashboardRoutesComponent = () => {

    return (
        <div>
            {
                JobseekerDashboardRoutes.map((r, k) => {
                    return <Route exact={r.exact} key={k}
                                  path={r.path}>{r.component}</Route>
                })
            }
        </div>
    )
}

export default JobSeekerDashboardRoutesComponent;
