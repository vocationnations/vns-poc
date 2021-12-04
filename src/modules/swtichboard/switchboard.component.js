import React, {useEffect, useState} from 'react';
import {useUser} from "../auth/context/user-provider";
import OnBoardingComponent from "../user/onboarding/onboarding.component";
import UserDashboardComponent from "../user/dashboard/user-dashboard.component";

const SwitchBoard = () => {

    const [newUser, setNewUser] = useState(true);

    const {user} = useUser();

    useEffect(() => {
        let first_time_status = user.attributes["custom:vn:firsttime"]
        setNewUser(first_time_status === "true")
    }, [])

    return newUser ? <OnBoardingComponent/> : <UserDashboardComponent/>
}

export default SwitchBoard;
