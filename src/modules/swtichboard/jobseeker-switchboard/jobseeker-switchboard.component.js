import React from 'react';
import JobseekerDashboardComponent
    from "../../user/dashboard/jobseeker/jobseeker-dashboard.component";
import JobseekerOnboardingComponent
    from "../../user/onboarding/jobseeker/jobseeker-onboarding.component";

const JobSeekerSwitchBoard = ({newUser}) => {

    return newUser ? <JobseekerOnboardingComponent/> : <JobseekerDashboardComponent/>
}

export default JobSeekerSwitchBoard;
