import {Service} from '../../../../app.service'

/**
 * AuthService is responsible for taking care of various communications
 * with firebase authentication protocol
 */
class JobSeekerOnBoardingService extends Service {

    constructor() {
        super()
    }

    /**
     * createUserProfession
     * @param job_title the title of the profession
     * @param job_code the unique ONET code for the profession
     * @param user_id the id of the user for which to update the profession
     * @param success_callback the function to call on success
     * @param error_callback the function to call on error
     */
    createUserProfession(job_title, job_code, user_id, success_callback, error_callback) {
        let payload = {
            title        : job_title,
            profession_id: job_code,
            user_id      : user_id
        }
        console.log(payload)
        this.submit(
            'create_user_profession',
            'POST',
            payload,
            success_callback,
            error_callback
        )
    }
}

export default JobSeekerOnBoardingService;
