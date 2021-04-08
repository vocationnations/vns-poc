import axios from "axios";
import {firebaseApp} from "./config/firebase-config";

const axios_instance = axios.create({
    baseURL: "http://localhost:10000/",
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
     * addDataToCollection is used to add new documents into a specific firebase collection
     * @param collection_name the collection name to add the document into
     * @param data the data to add to the firebase collection
     * @param success the callback that gets called when successful
     * @param error the callback that gets called when unsuccessful
     */
    addDataToCollection(collection_name, data, success, error) {
        firebaseApp
            .firestore()
            .collection(collection_name)
            .add(data)
            .then((res) => {
                success(res)
            })
            .catch((e) => {
                error(e)
            })
    }

    /**
     * checkFieldInDatabase checks to see if the value of the field matches to the one provided.
     * @param collection_name the collection name to check into
     * @param document_id the document in which the field resides
     * @param field the name of the field
     * @param val the value to check against
     * @param success the callback that runs if successful
     * @param errorCallback the callback that runs if unsuccessful
     * @return 0 if same, 1 if different
     */
    checkFieldInDatabase = (collection_name, document_id, field, val, success, errorCallback) => {
        firebaseApp
            .firestore()
            .collection(collection_name)
            .doc(document_id)
            .get()
            .then((doc) => {
                if(doc.exists){
                    const data = doc.data();

                    if(data[field]){
                        if(val === data[field]){
                            return success(0)
                        }
                        return errorCallback(1)
                    } else {
                        return errorCallback("field \"" + field + "\" not found")
                    }
                } else {
                    return errorCallback("document id \"" + document_id + "\" doesn't exist")
                }
            })
            .catch((e) => {
                console.log("Collection Name: " + collection_name);
                errorCallback(e.message);
            })
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
