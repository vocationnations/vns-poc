import axios from "axios";

const axios_instance = axios.create({
    baseURL: "",
    headers: {
        'Content-Type': 'application/json'
    }
})


/**
 * Generic Service class
 * Responsible for all the third-party services for VocationNations platform.
 */
class Service {

    RequestMethod = {
        POST: 'POST',
        GET: 'GET'
    }

    /**
     * Constructor
     * Prevents this class from being instantiated.
     */
    constructor() {
        if (this.constructor === Service)
            throw new TypeError('ERROR: Abstract class \"Service\" cannot be instantiated.');
    }

    /**
     * Generic function used for submitting firebase function requests.
     * @param endpoint the firebase function name
     * @param method the method of requests. Check above for possible methods
     * @param payload the data that needs to be sent along with the request
     * @param success callback function which gets called when the request is successful
     * @param error callback function which gets called when the request is not successful
     */
    submit(endpoint, method, payload = {}, success, error) {
        if (method === this.RequestMethod.POST) {
            axios_instance
                .post(endpoint, payload)
                .then(res => {
                    if (res.data.statusText === 'success') {
                        success(res.data)
                    } else {
                        error(res.data)
                    }
                })
                .catch(err => error(err))
        } else {
            throw new TypeError('ERROR: The requested method ' + method + ' is invalid or has not yet been implemented')
        }
    }
}

export {
    Service
}
