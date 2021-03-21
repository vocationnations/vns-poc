import {Service} from '../../../app.service';

/**
 * AuthService is responsible for taking care of various communications
 * with firebase authentication protocol
 */
class HomeGuestService extends Service {

    Collections = {
        PreSignup: 'pre-signup-records'
    }

    constructor() {
        super()
    }

    /**
     * recordNewPreSignup is a function that adds a new pre-signup document
     * to the firebase collection
     * @param user_data the user object to add to the collection
     * @param success_callback the callback that gets called when the process is successful
     * @param error_callback the callback that gets called when the process is not successful
     */
    recordNewPreSignup(user_data, success_callback, error_callback) {
        this.addDataToCollection(
            this.Collections.PreSignup,
            user_data,
            success_callback,
            error_callback
        )
    }
}

export default HomeGuestService;
