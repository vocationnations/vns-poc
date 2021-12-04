import React from 'react';
import SwitchBoard from "../../swtichboard/switchboard.component";

const AuthRoutes = [
    {
        name     : "SwitchBoard",
        path     : "/",
        exact    : true,
        component: <SwitchBoard/>
    }
]

export {
    AuthRoutes
}
