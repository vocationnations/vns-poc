import {Service} from "./index";

class AlgorithmService extends Service {
    calculateScore = (data, successHandler, errHandler) => {
        this.submit(
            'calculateScore',
            this.RequestMethod.POST,
            data,
            (res) => successHandler(res),
            (e) => errHandler(e)
        )
    }
}

export default AlgorithmService;
