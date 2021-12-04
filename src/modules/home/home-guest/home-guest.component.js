import React, {useState} from 'react';
import './home-guest.component.css'

import 'react-phone-number-input/style.css'
import HeroSection from "./sections/hero/hero-section";
import UserTypeSelectionSection
    from "./sections/user-type-selection/user-type-selection.section";
import SalesPitchSection from "./sections/sales-pitch/sales-pitch.section";
import CallToActionSection
    from "./sections/call-to-action/call-to-action.section";

const HomeGuestComponent = () => {

    const [userType,setUserType] = useState(null);

    return (
        <div className="container-fluid p-0">
            <HeroSection/>
            <UserTypeSelectionSection userType={userType} update={setUserType}/>
            {userType !== null && <SalesPitchSection userType={userType}/>}
            <CallToActionSection/>
        </div>
    )
}

export default HomeGuestComponent;
