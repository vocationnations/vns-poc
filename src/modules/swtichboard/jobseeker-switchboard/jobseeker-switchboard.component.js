import React from 'react';
import UserDashboardComponent
    from "../../user/dashboard/user-dashboard.component";
import JobseekerOnboardingComponent
    from "../../user/onboarding/jobseeker/jobseeker-onboarding.component";

const JobSeekerSwitchBoard = ({newUser}) => {

    return newUser ? <JobseekerOnboardingComponent/> : <UserDashboardComponent/>
}

export default JobSeekerSwitchBoard;
