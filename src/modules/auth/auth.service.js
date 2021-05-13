import {Service} from '../../app.service';
import {Auth} from 'aws-amplify';

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
        Auth.signIn(email, password)
            .then((user) => {
                console.log("SUCCESSFUL")
                console.log(user)
                success(user)
            })
            .catch((e) => {
                console.log("ERROR")
                console.log(e)
                error(e)
            })
    }

    /**
     * Logs out the currently logged in user
     */
    userLogout() {
        Auth.signOut({
            global: true
        })
    }


}

export default AuthService;
