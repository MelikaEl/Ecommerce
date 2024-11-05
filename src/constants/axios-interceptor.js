import axios from "axios";
import {getCookie, setCookie} from "../utils/helpers/cookie";
import refreshTokenApi from "../utils/apis/auth/refreshTokenApi";

const getAccessToken = async () => {
    const cookie = await getCookie("credential");
    return cookie?.access_token;
};

const getRefreshToken = async () => {
    const cookie = await getCookie("credential");
    return cookie?.refresh_token;
};

export const apiClient=axios.create({
    baseURL:"https://api.escuelajs.co/api/v1",
    headers:{
         Authorization: `Bearer ${await getAccessToken()}`,
    },
});

apiClient.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest=error.config;
        if(error.response.status===401 && !originalRequest._retry){
            originalRequest._retry=true;
            try{
                const refreshToken=await getRefreshToken();
                const response = await refreshTokenApi({refreshToken:refreshToken});

                const newAccessToken = response?.data?.access_token;
                const newRefreshToken =  response?.data?.refresh_token;

                const lastCookie = await getCookie("credential");
                const newCookie ={
                    ...lastCookie,
                    access_token: newAccessToken,
                    refresh_token: newRefreshToken,
                };

                console.log("new credential is \n:", newCookie);
                await setCookie("credential",newCookie);

                apiClient.defaults.headers[
                    "Authorization"
                ]=`Bearer ${newAccessToken}`;

                originalRequest.headers["Authorization"]=`Bearer ${newAccessToken}`;

                return apiClient(originalRequest);
            }
            catch (error){
                console.log("failed to submit new refresh token!");
                return Promise.reject(error)
            }
        }
        return Promise.reject(error);
    }
)

export default apiClient;

/*
The purpose of this code is to handle expired authentication tokens automatically. Here's a real-world analogy:
Imagine you're at a conference:
You have two badges:
Access badge (access_token) - valid for a short time
Renewal badge (refresh_token) - valid for longer
When you try to enter a room (make an API request):
If your access badge is valid → you get in (request succeeds)
If your access badge is expired (401 error):
Show your renewal badge to get a new access badge
Update both badges in your wallet (cookie)
Try entering the room again with your new access badge
This code does this automatically so that:
Users don't get logged out when their token expires
API requests continue working seamlessly
Security is maintained through token rotation
Failed requests are retried automatically
Common use cases:
User authentication
API authorization
Maintaining secure sessions
Handling token expiration gracefully
The beauty of this interceptor is that it works automatically for all API requests made through apiClient, providing a seamless experience for users even when their tokens expire.
*/