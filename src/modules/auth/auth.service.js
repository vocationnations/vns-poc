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
     * userLogin function accesses AWS Cognito Authentication API to attempt
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
     * getUserIdFromEmail function returns the id of the user from vns
     * database for a given user
     * @param email the email to get the user id from
     * @param success the callback to execute if successful
     * @param error the callback to execute if unsuccessful
     */
    getUserIdFromEmail(email, success, error) {
        this.submit(
            'get_users',
            this.RequestMethod.GET,
            {},
            (res) => {
                let usr = res.filter(a => a.email === email)[0]
                return success({
                    id: usr.id
                })
            },
            (err) => error(err)
        )
    }

    /**
     * userSignup function accesses AWS Cognito Authentication API to
     * attempt to signup the user
     * @param email
     * @param password
     * @param success
     * @param error
     * @param attributes
     */
    userSignup(email, password, success, error, attributes = null) {
        Auth.signUp({
            username  : email,
            password  : password,
            attributes: {...attributes, email: email}
        })
            .then((user) => {

                // also add the user into the VNS database
                this.submit(
                    'set_user',
                    this.RequestMethod.POST,
                    {
                        name : email,
                        email: email
                    },
                    () => {
                        console.log("User signup successful")
                        success(user)
                    },
                    (err) => {
                        console.log("Failed to add the user data to database")
                        error(err)
                    }
                )
            })
            .catch((e) => {
                console.log("ERROR Signup")
                console.log(e)
                error(e)
            })
    }

    /**
     * Logs out the currently logged in user
     */
    async userLogout() {
        try {
            await Auth.signOut({global: true});
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }


}

export default AuthService;
