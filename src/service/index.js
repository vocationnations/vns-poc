import axios from "axios";

const axios_instance = axios.create({
    baseURL: "http://localhost:10000/",
    headers: {
        'Content-Type': 'application/json'
    }
})

class Service {

    RequestMethod = {
        POST: 'POST',
        GET: 'GET'
    }

    constructor() {
        if (this.constructor === Service)
            throw new TypeError('ERROR: Abstract class \"Service\" cannot be instantiated.');
    }

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
        }
    }
}

export {
    Service
}
