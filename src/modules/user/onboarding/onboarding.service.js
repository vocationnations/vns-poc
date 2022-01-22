import {Service} from '../../../app.service'

/**
 * AuthService is responsible for taking care of various communications
 * with firebase authentication protocol
 */
class OnBoardingService extends Service {

    constructor() {
        super()
    }

    /**
     * getOccupationByKeyword
     * @param keyword the keyboard to search for
     * @param success_callback the function to call on success
     * @param error_callback the function to call on error
     */
    getOccupationsByKeyword(keyword, success_callback, error_callback) {
        this.submit(
            'get_job_by_keyword/' + keyword,
            'GET',
            {},
            success_callback,
            error_callback
        )
    }

    getSkillsByOccupationId(occupation_id, success_callback, error_callback) {
        this.submit(
            'get_skills_by_occupation/' + occupation_id,
            'GET',
            {},
            success_callback,
            error_callback
        )
    }
}

export default OnBoardingService;
