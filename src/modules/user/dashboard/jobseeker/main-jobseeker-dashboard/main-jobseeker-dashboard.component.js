import React, {useState} from 'react';
import AuthService from "../../../../auth/auth.service";
import {useUser} from "../../../../auth/context/user-provider";
import {Link} from "react-router-dom";

const auth_service = new AuthService();

const JobseekerDashboardMainComponent = () => {

    const [radialData, setRadialData] = useState([100, 100, 100, 100])
    const [cultureInput, setCultureInput] = useState(null);


    const {user} = useUser();

    const logout = async () => {
        await auth_service.userLogout();
        window.location.href = '/';

    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="vspacer-20" />
            <h1>VOCATIONATIONS</h1>
            <h6 className="text-uppercase text-muted">job seeker dashboard</h6>
            <div className="vspacer-50" />
            <p className="lead text-center">
                Thank you for stopping by! We are developing our platform and will be
                launching it very soon! <br />In the meantime, please fill out the survey and let us know what you think about us!
            </p>
            <br />
            <div className={"d-flex flex-column border-black p-5"}>
                <h6 className={"text-center"}>actions</h6>
                <hr width={100} />
                <button className="btn btn-info" onClick={() => window.open('https://www.surveymonkey.com/r/8JVK8KY','_blank')}>Take a survey</button>
                <br />
                <button className="btn btn-info">
                    <Link to="/a/dashboard/jobseeker/culture" style={{textDecoration: 'none', color: 'white'}}>Take a culture survey</Link>
                </button>
                <br />
                <hr width={200}/>
                <br />
                <button className="btn btn-danger" onClick={() => logout()} >Logout</button>
            </div>
        </div>
    )
}

export default JobseekerDashboardMainComponent;
