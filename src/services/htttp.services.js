// import Axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;
// // Axios.defaults.baseURL = API_URL;
// Axios.defaults.baseURL = 'http://localhost:8000/api/v1'

// export class HttpService {
//     _axios = Axios.create();

//     addRequestInterceptor = (onFulfilled, onRejected) => {
//         this._axios.interceptors.request.use(onFulfilled, onRejected);
//     };

//     addResponseInterceptor = (onFulfilled, onRejected) => {
//         this._axios.interceptors.response.use(onFulfilled, onRejected);
//     };

//     get = async (url) => await this.request(this.getOptionsConfig("get", url));

//     post = async (url, data) => await this.request(this.getOptionsConfig("post", url, data));

//     put = async (url, data) => await this.request(this.getOptionsConfig("put", url, data));

//     patch = async (url, data) => await this.request(this.getOptionsConfig("patch", url, data));

//     delete = async (url) => await this.request(this.getOptionsConfig("delete", url));

//     getOptionsConfig = (method, url, data) => {
//         return {
//             method,
//             url,
//             data,
//             headers: { "Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json", 'Access-Control-Allow-Credentials': true },
//         };
//     };

//     request(options) {
//         return new Promise((resolve, reject) => {
//             this._axios
//                 .request(options)
//                 .then((res) => resolve(res.data))
//                 .catch((ex) => reject(ex.response.data));
//         });
//     }
// }

// export default new HttpService();

// src/services/http.service.js
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Create an Axios instance
const axiosInstance = Axios.create({
    baseURL: API_URL, // Your server's base URL
    withCredentials: true // Enable sending cookies with requests
});

export class HttpService {
    constructor() {
        this._axios = axiosInstance;
    }

    addRequestInterceptor(onFulfilled, onRejected) {
        this._axios.interceptors.request.use(onFulfilled, onRejected);
    }

    addResponseInterceptor(onFulfilled, onRejected) {
        this._axios.interceptors.response.use(onFulfilled, onRejected);
    }

    get(url) {
        return this._axios.get(url).then(response => response.data);
    }

    post(url, data) {
        return this._axios.post(url, data).then(response => response.data);
    }

    put(url, data) {
        return this._axios.put(url, data).then(response => response.data);
    }

    patch(url, data) {
        return this._axios.patch(url, data).then(response => response.data);
    }

    delete(url) {
        return this._axios.delete(url).then(response => response.data);
    }
}

const httpService = new HttpService();
export default httpService;
