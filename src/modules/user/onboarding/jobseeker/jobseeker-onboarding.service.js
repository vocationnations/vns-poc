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

    /**
     * createUserSkill
     * @param skill_name the name of the skill to add
     * @param skill_id the code of the skill from ONET
     * @param user_id the id of the user for which to update the skill
     * @param success_callback the function to call on success
     * @param error_callback the function to call on error
     */
    createUserSkill(skill_name, skill_id, user_id, success_callback, error_callback) {
        let payload = {
            skill_name: skill_name,
            skill_id  : skill_id,
            user_id   : user_id
        }
        console.log(payload)
        this.submit(
            'create_user_skill',
            'POST',
            payload,
            success_callback,
            error_callback
        )
    }

    /**
     * addCultureEntry
     * @param radial_data
     * @param success_callback
     * @param error_callback
     */
    addCultureEntry(radial_data, success_callback, error_callback) {

        this.submit(
            'create_culture_entry',
            'POST',
            radial_data,
            success_callback,
            error_callback
        )
    }

    getAllQuestionsAndSteps(success_callback, error_callback) {
        this.submit(
            'get_climate_questions',
            'GET',
            {},
            (res1) => {

                let new_res = JSON.parse(JSON.stringify(res1))
                console.log("NEW RES:")
                console.log(new_res)

                for (let q = 0; q < new_res.length; q++) {
                    let q_id = new_res[q].id
                    this.submit(
                        'get_steps/' + q_id,
                        'GET',
                        {},
                        (res2) => {
                            new_res[q]["steps"] = res2
                            new_res = JSON.parse(JSON.stringify(new_res))
                        },
                        (e) => console.log(e.message)
                    )
                }
                success_callback(new_res)
            },
            (e) => console.log(e.message)
        )
    }

    // addClimateEntry()

    createUserSkillManual(skill_payload, success_callback, error_callback) {
        console.log(skill_payload)
        this.submit(
            'create_user_skill_manual',
            'POST',
            skill_payload,
            success_callback,
            error_callback
        )
    }
}

export default JobSeekerOnBoardingService;
