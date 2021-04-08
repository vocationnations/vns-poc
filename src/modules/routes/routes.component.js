import React from 'react';
import {useUser} from '../auth/context/user-provider';
import HomeGuestComponent from "../home/home-guest/home-guest.component";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginComponent from "../auth/login/login.component";
import {AuthRoutes} from "../auth/auth-routes/auth-routes.component";
import SignupComponent from "../auth/signup/signup.component";
import LoginCandidate from "../auth/login/login-candidate/login-candidate";
import LoginCompany from "../auth/login/login-company/login-company";

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
        exact: true,
        component: <LoginCandidate/>
    },
    {
        name: "Login Candidate",
        path: "/login/candidate",
        exact: false,
        component: <LoginCandidate/>
    },
    {
        name: "Login Company",
        path: "/login/company",
        exact: false,
        component: <LoginCompany/>
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
