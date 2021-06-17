import React, {useState} from 'react';
import {Auth} from "aws-amplify";
import {useHistory, useParams} from 'react-router-dom'

const UserConfirmComponent = () => {

    const {email} = useParams();
    const history = useHistory();


    const [success, setSuccess] = useState("")
    const [error, setError] = useState('')

    const [confirmationCode, setConfirmationCode] = useState('')

    const handleConfirmation = () => {
        if (email === '' || confirmationCode === '') {
            setError("ERROR: Email and confirmation code are required!")
        } else {
            Auth.confirmSignUp(email, confirmationCode)
                .then(() => {
                    setSuccess("Successfully confirm. Redirecting to login" +
                        " page...!")
                    setTimeout(() => {
                        history.push('/login')
                    }, 2000)
                })
                .catch(e => setError(e))
        }
    }

    return (
        <div className="container pt-5">
            <div className="d-flex justify-content-center">
                <p className="lead text-center w-50">
                    Thank you for sign up for VocationNations! We cannot wait to
                    connect with you and help you find culture-focused and
                    meaningful employment for you. However, before we do that,
                    we
                    need to confirm your email address.

                    <br/><br/>
                    You should have received a confirmation code on your email.
                    Please paste it in the input box below.
                </p>
            </div>
            <div className="w-50 mx-auto">
                {error !== "" &&
                <div className="alert alert-danger">{error}</div>}
                {success !== "" &&
                <div className="alert alert-success">{success}</div>}
                <div className="vspacer-20"/>
                <label>Email:</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    disabled={true}
                    required
                />
                <br/>

                <label>Confirmation Code:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Confirmation Code"
                    required
                    onChange={(e) => setConfirmationCode(e.target.value)}/>
                <br/>

                <button className="btn btn-info"
                        onClick={() => handleConfirmation()}>Confirm
                </button>
            </div>
        </div>
    );
}

export default UserConfirmComponent;
