import apiClient from "../../../constants/axios-interceptor";

export const refreshTokenApi = async (data)=>{
    try{
        return await apiClient.post("auth/refresh-token",data);// in the erfresh token API, we send our access token and take the refresh token and because of sending the access token we use the post method
    }
    catch (error){
        return error
    }
}

export default refreshTokenApi;