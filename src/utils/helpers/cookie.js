import Cookies from "js-cookie";
import {encryptJWT, decryptJWT} from "./jwt";

export const setCookie = async (key,data)=>
    Cookies.set(key, await encryptJWT(data));

export const getCookie=async(key)=>await decryptJWT(Cookies.get(key));
export const removeCookie=async (key) => Cookies.remove(key);

/*
Let me explain these cookie management functions in simple terms:

This file provides three main functions that work with browser cookies, but with added security using JWT:

1. `setCookie`:
   - Takes a key (name) and some data
   - Encrypts the data using JWT (using the `encryptJWT` we saw earlier)
   - Saves it as a browser cookie
   ```javascript
   // Example usage:
   await setCookie("user", { id: 123, name: "John" });
   ```

2. `getCookie`:
   - Takes a key (name)
   - Gets the encrypted cookie value
   - Decrypts it using JWT (using the `decryptJWT` we saw earlier)
   - Returns the original data
   ```javascript
   // Example usage:
   const userData = await getCookie("user"); // { id: 123, name: "John" }
   ```

3. `removeCookie`:
   - Takes a key (name)
   - Deletes that cookie from the browser
   ```javascript
   // Example usage:
   await removeCookie("user");
   ```

Think of it like a secure storage box in your browser:
- `setCookie` = Put something in the box and lock it
- `getCookie` = Unlock the box and get what's inside
- `removeCookie` = Throw away the box completely

This is commonly used for:
- Storing user session information
- Saving user preferences
- Maintaining authentication state
- Storing any sensitive data that needs to persist in the browser

The advantage of using JWT encryption here is that the cookie contents are secure and can't be tampered with, even though they're stored in the browser.
*/