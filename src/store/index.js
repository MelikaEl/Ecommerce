import {create} from "zustand";

const useStore = create((set)=>({
    access_token:null,
    refresh_token:null,
    setState:(data)=>
        set({
            access_token:data?.access_token,
            refresh_token:data?.refresh_token,
        }),
        removeState:()=>set({access_token:null,refresh_token:null}),
}));
export default useStore;
/*
Let me explain how this code works with Zustand in simple terms:

This `Authorize` component does three main things:

1. Gets access to Zustand's `setState` function:
```javascript
const { setState } = useStore();
```
This connects to our Zustand store defined in:

```3:12:src/store/index.js
const useStore = create((set)=>({
    access_token:null,
    refresh_token:null,
    setState:(data)=>
        set({
            access_token:data?.access_token,
            refresh_token:data?.refresh_token,
        }),
        removeState:()=>set({access_token:null,refresh_token:null}),
}));
```


2. When the component loads, it:
   - Reads the encrypted cookie named "credential"
   - Decrypts it using our JWT functions
   - Gets back the original data (containing access_token and refresh_token)

3. Updates the global Zustand store:
   - Takes the decrypted cookie data
   - Uses `setState` to store the tokens in Zustand
   - Makes these tokens available throughout the app

Think of it like this:
- The cookie is like a locked safe containing tokens
- This code opens the safe (decrypts the cookie)
- Takes the tokens out
- Puts them in a globally accessible display case (Zustand store)

Now any component in your app can access these tokens using:
```javascript
const { access_token, refresh_token } = useStore();
```

This is useful because:
- Tokens are securely stored in an encrypted cookie
- But also easily accessible in memory through Zustand
- Any component that needs to make authenticated API calls can quickly access the tokens

The commented-out `setCookie` line shows how you would initially store the tokens (typically after a user logs in).
*/