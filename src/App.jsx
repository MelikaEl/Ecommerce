import React, { useEffect } from "react";
import { setCookie } from "./utils/helpers/cookie";
// import { getCookie } from './utils/helpers/cookie';

// import { useStore } from "zustand";
import useStore from "./store"; // in the toturial it imports from ./store 33 to 35 minutes
import getProductsApi from "./utils/apis/products/getProductsApi";

const App = () => {
  const { access_token, refresh_token } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      
        await setCookie("credential", {
          access_token: "jfnvjdnvjnjnfjnv",
          refresh_token: "hjnvjn877ndsd",
        });
      
      const result = await getProductsApi();
      console.log(result);
    };
    fetchData();
  }, []);

  // useEffect(()=>{
  //   const createCookie=async()=>{
  //     await setCookie("credential",{
  //       name:"alireza",
  //       access_token:"alskjasdasd4asd",
  //       refresh_token:"a6sd4as6d4a5sd"
  //     })
  //   }
  //   createCookie();
  // },[])
  return (
    <div>
      {/* access_token: */}
      access_token: {access_token ? access_token : "no access token is set!"}
      <br />
      refresh_token:{" "}
      {refresh_token ? refresh_token : "no refresh token is set!"}
    </div>
  );
};

export default App;

/*
Let me explain this `useEffect` in simple terms:

This code creates a cookie as soon as the component mounts (loads). Here's what it does step by step:

1. Creates an async function called `createCookie`
2. Inside this function, it sets a cookie named "credential" with an object containing:
   - A name ("alireza")
   - An access token
   - A refresh token
3. Immediately calls this function
4. The empty dependency array `[]` means this only runs once when the component first loads

The data being stored is encrypted using JWT (as we can see from the cookie helper functions in):

```1:8:src/utils/helpers/cookie.js
import Cookies from "js-cookie";
import {encryptJWT, decryptJWT} from "./jwt";

export const setCookie = async (key,data)=>
    Cookies.set(key, encryptJWT(data));

export const getCookie=async(key)=>await decryptJWT(Cookies.get(key));
export const removeCookie=async (key) => Cookies.remove(key);
```


Here's a simpler way to think about it:
- When the page loads
- It creates a locked box (cookie) named "credential"
- Puts some sensitive user data inside
- Encrypts and stores it in the browser

This pattern is commonly used for:
- Storing authentication information after login
- Maintaining user sessions
- Saving tokens for API access

Note: In a real application, the tokens would come from an authentication server rather than being hardcoded values.
*/
