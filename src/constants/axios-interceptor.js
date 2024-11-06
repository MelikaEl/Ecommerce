import axios from "axios";
import { getCookie, setCookie } from "../utils/helpers/cookie";
import refreshTokenApi from "../utils/apis/auth/refreshTokenApi";

/*
the purpose of using the access tokens is for the security reasons because everybody can't send requests to the API 
that we have and we want to get access to the API to the sprcified people. Because the access tokens have an expired
time, so the reason of the refresh tokens are for a time when the access tokens are expired. 
*/

const getAccessToken = async () => {
  const cookie = await getCookie("credential"); // the reason that we store the tokens in the cookies instead of the local storage or session storage is for the security reasons. I wite the difference between storing the data in these three places in the API  part of the obsidian

  return cookie?.access_token;
};

const getRefreshToken = async () => {
  const cookie = await getCookie("credential");
  return cookie?.refresh_token;
};

export const apiClient = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    // the headers of the API requests append additional data and here the additional data is the token
    Authorization: `Bearer ${await getAccessToken()}`,
  },
});

apiClient.interceptors.response.use(
  //here we use interceptors for handling the refresh token because the interceptors are use for making changes in the API requests. Here we apply a rule for when the access tokens are expired, we get the refresh tokens.
  (response) => response,
  async (error) => {
    console.log("e1");
    const originalRequest = error.config;
    if (error.response.status === 404 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("e2");

      originalRequest._retry = true;

      /*
            This line of code is part of a retry mechanism in the axios interceptor to prevent infinite loops when refreshing tokens. Let me explain:

1. **Purpose**: `_retry` is a flag that indicates whether we've already attempted to retry this request after a token refresh.

2. **Why it's needed**:
   - Without this flag, if a request fails due to an expired token, we could end up in an infinite loop:
     - Request fails → Refresh token → Retry request → Request fails again → Refresh token... and so on
   - By marking `_retry = true`, we ensure each failed request only gets one retry attempt

3. **In your code**: 
```javascript:src/constants/axios-interceptor.js
// ... existing code ...
if(error.response.status===404 && !originalRequest._retry){
    originalRequest._retry=true;  // Mark that we're attempting a retry
    // ... attempt token refresh and retry request ...
}
// ... existing code ...
```

Note: I notice that in your code, `originalRequest._retry=true` appears twice in succession, which is redundant. You can remove one of these lines as setting it once is sufficient.

4. **Flow**:
   - First failed request: `_retry` is `false` → attempt refresh
   - If the retried request fails: `_retry` is `true` → reject immediately
   - This prevents endless retry loops
            */
      console.log("e3");

      try {
        const refreshToken = await getRefreshToken();
        const response = await refreshTokenApi({ refreshToken: refreshToken });

        const newAccessToken = response?.data?.access_token;
        const newRefreshToken = response?.data?.refresh_token;

        const lastCookie = await getCookie("credential");
        const newCookie = {
          ...lastCookie,
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
        };

        console.log("new credential is \n:", newCookie);
        await setCookie("credential", newCookie);

        apiClient.defaults.headers[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (error) {
        console.log("failed to submit new refresh token!");
        return Promise.reject(error);
      }
    }
    return Promise.reject(
      error
    ); 
    /*The Promise.reject(error) is used in error handling to properly propagate errors through the Promise chain. Here's why it's important:
    Purpose:
    It creates a rejected Promise with the given error
    Allows the error to be caught by .catch() blocks in the calling code
    Maintains the Promise-based error handling pattern. 

    Why not just throw?
throw error would break the Promise chain
Promise.reject(error) maintains the async nature of the interceptor
Ensures errors are handled consistently throughout the application
Allows proper error handling in async/await contexts
This pattern ensures that errors are properly handled and can be caught by the code making the API requests, rather than being silently swallowed or causing unhandled rejections.
     */
  }
);

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
