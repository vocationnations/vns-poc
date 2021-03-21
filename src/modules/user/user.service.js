import {Service} from "../../app.service";

class AlgorithmService extends Service {
    calculateScore = (data, successHandler, errHandler) => {
        console.log(data);
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
