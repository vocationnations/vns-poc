import React from 'react';
import ReactDOM from 'react-dom';

// LogRocket configuration
import LogRocket from 'logrocket';
import AppComponent from "./app.component";

LogRocket.init('k0ysgq/vocationnations-poc')

ReactDOM.render(
    <React.StrictMode>
        <AppComponent/>
    </React.StrictMode>,
    document.getElementById('root')
);
