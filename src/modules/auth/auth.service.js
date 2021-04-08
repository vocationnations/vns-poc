import {Service} from '../../app.service';
import {firebaseAppAuth} from "../../config/firebase-config";

/**
 * AuthService is responsible for taking care of various communications
 * with firebase authentication protocol
 */
class AuthService extends Service {

    UserTypes = {
        Candidate: "candidate",
        Company: "company",
        Admin: "admin"
    };

    Collections = {
        Users: "users"
    }

    constructor() {
        super()
    }

    /**
     * checkUserType checks to see if the user type is correct
     * @param email the email of the user to check the type of
     * @param type_val the type value to check the database against
     * @param success if successful, run this function
     * @param error if unsuccessful run this function.
     */
    checkUserType(email, type_val, success, error) {
        this.checkFieldInDatabase(this.Collections.Users, email, "type",type_val,success,error);
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
