import React, {useState} from 'react';
import './home-guest.component.css'
import {Auth} from "aws-amplify";
import {useHistory} from "react-router-dom";

import 'react-phone-number-input/style.css'
import HeroSection from "./sections/hero/hero-section";
import UserTypeSelectionSection
    from "./sections/user-type-selection/user-type-selection.section";
import SalesPitchSection from "./sections/sales-pitch/sales-pitch.section";

const HomeGuestComponent = () => {

    const [userType,setUserType] = useState(null);

    const [name, setName] = useState("");
    const [org, setOrg] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const history = useHistory();

    const recordPreSignup = () => {

        setError("")
        setSuccess("")

        // is phone correct?
        let phone_regex = /\+1[0-9]{10}/
        let phone_match = phone_regex.exec(phone)

        if (name === "" || email === "" || phone === "") {
            setError("The fields name, email and phone are required.")
        } else {

            // are passwords correct
            if (password !== confirmPass) {
                setError("The passwords do not match!")
            }

            // is phone number accurate
            if (!phone_match) {
                setError("Phone number not valid!")
            }


            Auth.signUp({
                    username: email,
                    password: password,
                    attributes: {
                        email: email,
                        'custom:org': org,
                        phone_number: phone
                    }
                }
            )
                .then((res) => {
                    console.log(res);
                    history.push('/confirm/' + email)
                })
                .catch(e => setError(e.message))
        }
    }

    return (
        <div className="container-fluid p-0">
            <HeroSection />
            <UserTypeSelectionSection update={setUserType} />
            {userType !== null && <SalesPitchSection userType={userType} />}
        </div>
    )
}

export default HomeGuestComponent;
