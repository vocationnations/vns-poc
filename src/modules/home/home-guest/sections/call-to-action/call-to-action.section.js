import React from 'react';
import {Link} from 'react-router-dom';

const CallToActionSection = ({userType}) => {
    return (
        <section className=" p-0">
            <div className="container text-center">
                <div className="vspacer-50"/>
                <h1 className="text-center">SIGN UP TODAY...</h1>
                <p className="lead w-75 mx-auto text-center">
                    Are you excited about learning more? Sign up today!
                </p>
                <br/>
                <Link to={"/signup?type=" + userType}>
                    <button
                        className="btn btn-primary btn-lg"
                    >Sign up
                    </button>
                </Link>
                <div className="vspacer-20"/>
            </div>
        </section>
    );
}
export default CallToActionSection;
