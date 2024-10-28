import httpService from "./htttp.service";


// Function to set up interceptors
export const setupAxiosInterceptors = (onUnauthenticated) => {
    // Request interceptor to add the access token to headers
    const onRequestSuccess = (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    };

    const onRequestFail = (error) => Promise.reject(error);

    httpService.addRequestInterceptor(onRequestSuccess, onRequestFail);

    // Response interceptor to handle token refreshing
    const onResponseSuccess = (response) => response;

    const onResponseFail = async (error) => {
        const originalRequest = error.config;
        if (error.response) {
            const status = error.response.status;

            // If token expired
            if ((status === 403 || status === 401) && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    // Attempt to refresh the token
                    const res = await httpService.post('/token');
                    const newAccessToken = res.accessToken;
                    // Save the new access token
                    localStorage.setItem('accessToken', newAccessToken);
                    // Update the Authorization header and retry the original request
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return httpService._axios(originalRequest);
                } catch (err) {
                    // Refresh token is invalid or expired
                    console.error('Refresh token invalid', err);
                    onUnauthenticated();
                    return Promise.reject(err);
                }
            }
        }
        return Promise.reject(error);
    };

    httpService.addResponseInterceptor(onResponseSuccess, onResponseFail);
};

// export const setupAxiosInterceptors = (onUnauthenticated) => {
//     const onRequestSuccess = async (config) => {
//         const token = localStorage.getItem("token");
//         config.headers.Authorization = `Bearer ${token}`;
//         return config;
//     };
//     const onRequestFail = (error) => Promise.reject(error);

//     HttpService.addRequestInterceptor(onRequestSuccess, onRequestFail);

//     const onResponseSuccess = (response) => response;

//     const onResponseFail = (error) => {
//         const status = error.status || error.response.status;
//         if (status === 403 || status === 401) {
//             onUnauthenticated();
//         }

//         return Promise.reject(error);
//     };
//     HttpService.addResponseInterceptor(onResponseSuccess, onResponseFail);
// };



// import axios from 'axios';

// // Create an Axios instance
// const api = axios.create({
//     baseURL: 'http://localhost:3000', // Your server's base URL
//     withCredentials: true // Enable sending cookies with requests
// });

// // Request interceptor to add the access token to headers
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Response interceptor to handle token refreshing
// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         // If access token expired and we haven't retried yet
//         if (error.response.status === 403 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 // Attempt to get a new access token
//                 const res = await api.post('/token');
//                 const newAccessToken = res.data.accessToken;
//                 // Save the new access token
//                 localStorage.setItem('accessToken', newAccessToken);
//                 // Update the Authorization header and retry the original request
//                 originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                 return api(originalRequest);
//             } catch (err) {
//                 // Refresh token is invalid or expired
//                 console.error('Refresh token invalid', err);
//                 // Redirect to login or handle logout
//                 window.location.href = '/login';
//                 return Promise.reject(err);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default api;

