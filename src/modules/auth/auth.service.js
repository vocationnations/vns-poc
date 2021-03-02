import {Service} from '../../app.service';
import {firebaseAppAuth} from "../../config/firebase-config";

/**
 * AuthService is responsible for taking care of various communications
 * with firebase authentication protocol
 */
class AuthService extends Service {
    constructor() {
        super()
    }


    /**
     * userLogin function accesses firebase Authentication API to attempt
     * to log in the user.
     * @param email the user's email
     * @param password the user's password
     * @param success the callback to execute if successful
     * @param error the callback to execute if unsuccessful
     */
    userLogin(email, password, success, error) {
        firebaseAppAuth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                success(res)
            })
            .catch((err) => {
                error(err)
            })
    }

    /**
     * Logs out the currently logged in user
     */
    userLogout() {
        firebaseAppAuth.signOut();
    }


}

export default AuthService;
