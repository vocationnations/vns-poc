import React from 'react';
import ReactDOM from 'react-dom';

// LogRocket configuration
import LogRocket from 'logrocket';
import AppComponent from "./app.component";
import awsconfig from './aws-exports'
import {Amplify} from "aws-amplify";

LogRocket.init('k0ysgq/vocationnations-poc')
Amplify.configure(awsconfig)

ReactDOM.render(
    <React.StrictMode>
        <AppComponent/>
    </React.StrictMode>,
    document.getElementById('root')
);
