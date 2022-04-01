import React from 'react';
import SwitchBoard from "../../swtichboard/switchboard.component";

const AuthRoutes = [
    {
        name     : "SwitchBoard",
        path     : "/a",
        exact    : false,
        component: <SwitchBoard/>
    }
]

export {
    AuthRoutes
}
