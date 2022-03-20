import React, {useEffect, useState} from 'react';
import {useUser} from "../auth/context/user-provider";
import JobseekerSwitchboardComponent
    from "./jobseeker-switchboard/jobseeker-switchboard.component";
import EmployerSwitchboardComponent
    from "./employer-switchboard/employer-switchboard.component";
import APP from '../../app.constants'

const SpecificBoard = (userType, newUser) => {
    switch (userType) {
        case APP.JobSeeker:
            return <JobseekerSwitchboardComponent newUser={newUser} />
        case APP.Employer:
            return <EmployerSwitchboardComponent newUser={newUser} />
        default:
            return <div>Invalid user type. Please contact support</div>
    }
}

const SwitchBoard = () => {

    const [newUser, setNewUser] = useState(true);
    const [userType, setUserType] = useState(null);

    const {user} = useUser();

    useEffect(() => {
        let first_time_status = user.attributes["custom:vn:firsttime"]
        let userType = user.attributes["custom:vn:usertype"]
        setNewUser(first_time_status === "true")
        setUserType(userType)
    }, [])

    return SpecificBoard(userType, newUser)
}

export default SwitchBoard;
