// import { useRefreshTokenMutation } from './authApi';

import { useEffect } from "react";
import { useRefreshTokenMutation } from "../../services/auth-service";
import { setCredentials } from "../../redux/auth/authSlice";
import { setToken } from "../../util/localStorage";

export function useCheckTokenOnRefresh() {
    // const [refreshToken] = useRefreshTokenMutation();

    // useEffect(() => {
    //     const storedToken = localStorage.getItem('token'); // or sessionStorage
    //     if (storedToken) {
    //         refreshToken()
    //             .unwrap()
    //             .then((response) => {

    //                 console.log("response", response)
    //                 // Update the tokens in the Redux state and local storage
    //                 setToken(response.refreshToken)
    //                 // localStorage.setItem('accessToken', response.accessToken);
    //                 // localStorage.setItem('refreshToken', response.refreshToken);
    //                 setCredentials(response?.data)
    //             })
    //             .catch(() => {
    //                 // Optionally, handle token refresh failure (e.g., force logout)
    //                 console.log("Token refresh failed, redirecting to login");
    //                 localStorage.removeItem('accessToken');
    //                 localStorage.removeItem('refreshToken');
    //                 // Redirect to login page if needed
    //             });
    //     }
    // }, [refreshToken]);
}
