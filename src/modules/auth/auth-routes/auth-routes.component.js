import React from 'react';
import UserDashboardComponent from "../../user/dashboard/user-dashboard.component.html";

const AuthRoutes = [
    {
        name: "Dashboard",
        path: "/",
        exact: true,
        component: <UserDashboardComponent/>
    },
]

export {
    AuthRoutes
}
