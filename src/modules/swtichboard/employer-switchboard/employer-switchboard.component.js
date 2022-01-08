import React from 'react';
import EmployerOnboardingComponent
    from "../../user/onboarding/employer/employer-onboarding.component";
import EmployerDashboardComponent
    from "../../user/dashboard/employer/employer-dashboard.component";

const EmployerSwitchboardComponent = ({newUser}) => {
    return newUser ? <EmployerOnboardingComponent/> :
        <EmployerDashboardComponent/>
};

export default EmployerSwitchboardComponent;
