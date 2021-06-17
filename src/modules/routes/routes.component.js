import React from 'react';
import {useUser} from '../auth/context/user-provider';
import HomeGuestComponent from "../home/home-guest/home-guest.component";
import {HashRouter as Router, Route} from "react-router-dom";
import LoginComponent from "../auth/login/login.component";
import {AuthRoutes} from "../auth/auth-routes/auth-routes.component";
import SignupComponent from "../auth/signup/signup.component";

const MainRoutes = [
    {
        name: "Welcome to VocationNations",
        path: "/",
        exact: true,
        component: <HomeGuestComponent/>
    },
    {
        name: "Login",
        path: "/login",
        exact: false,
        component: <LoginComponent/>
    },
    {
        name: "Signup",
        path: "/signup",
        exact: false,
        component: <SignupComponent/>
    }
]

const RoutesComponent = () => {

    const {user} = useUser();

    const RouteList = user !== null ? AuthRoutes : MainRoutes;


    return (
        <Router>
            {
                RouteList.map((r, k) => {
                    return <Route exact={r.exact} key={k} path={r.path}>{r.component}</Route>
                })
            }
        </Router>
    )
}

export default RoutesComponent;
