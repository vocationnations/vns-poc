import React from 'react';
import UserDashboardComponent
    from "../../user/dashboard/user-dashboard.component";

const AuthRoutes = [
    {
        name: "Dashboard",
        path: "/",
        exact: true,
        component: <UserDashboardComponent/>
    }
]

export {
    AuthRoutes
}
