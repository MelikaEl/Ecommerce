import React,{useEffect} from 'react';
import { setCookie } from './utils/helpers/cookie';

const App = () => {
  useEffect(()=>{
    const createCookie=async()=>{
      await setCookie("credential",{
        name:"alireza",
        access_token:"bjhjkhbbnbjhuhjn87j",
        refresh_token:"jhjhjhghftf8778787"
      })
    }
    createCookie();
  },[])
  return (
    <div>App</div>
  )
}

export default App

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
