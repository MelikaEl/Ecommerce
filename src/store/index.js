import {create} from "zustand";

const useStore = create((set)=>({
    access_token:null,
    refresh_token:null,
    setState:(data)=>
        set({
            access_token:data?.access_token,//The ?. is called the "optional chaining operator" in JavaScript. Let me explain why it's used here:1. Purpose: It's a safe way to access nested object properties without causing an error if the parent object is null or undefined. In this context: When setState is called, if data is null or undefined, instead of throwing an error, it will gracefully return undefined. This makes the code more robust by handling cases where data might not exist, which could happen if there's an error reading the cookie or during initialization.
            refresh_token:data?.refresh_token,
        }),
        removeState:()=>set({access_token:null,refresh_token:null}),
}));
export default useStore;

/*
I don't understand how and why the zustand used in this app. Can you help me understand it in a simple and easy way.

Let me explain how Zustand is used in this app in a simple way:
First, we create a store (like a global box to keep our data):
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

This store has:
Two pieces of data: access_token and refresh_token (both start as null)
Two functions:
setState: to update both tokens
removeState: to clear both tokens
The Provider component reads the cookie and updates the store:
const Authorize = ({ children }) => {
  const { setState } = useStore();
  useEffect(() => {
    const readCookie = async () => {
      //first we set cookie and comment the get cookie then comment the set cookie and uncomment the get cookie
    
      // await setCookie("credential", {
      //   access_token: "hbjhbjniijoij8787876hbhjb",
      //   refresh_token: "khbjnkmlkjjnuh76765fhgvhgv",
      // });
  return <Authorize>{children}</Authorize>;
      const result = await getCookie("credential");//we can see the credential that has the coockie saved on it in the application tab of the developer toold
      setState(result);
      console.log(result);
    };
    readCookie();
  }, []);
  return <>{children}</>;
When the app starts:
Reads the encrypted cookie
Uses setState from Zustand to save the tokens in the store
This makes the tokens available everywhere in the app
The App component uses the stored data:
const App = () => {
        name:"alireza",
  const { access_token, refresh_token} = useStore();
        refresh_token:"a6sd4as6d4a5sd"
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
    <div>App</div>
    
      access_token: {access_token ? access_token : "no access token is set!"}
      <br/>
      refresh_token:{" "}
      {refresh_token ? refresh_token : "no refresh token is set!"}
    </div>
  );

  Gets tokens from the store using useStore
Displays them on the screen
Shows a message if tokens aren't set
Think of Zustand like a central bulletin board:
The Provider reads the cookie and posts the tokens on the board
Any component can look at the board to see the tokens
Any component can update the board using setState
Any component can clear the board using removeState
The main benefits of using Zustand here are:
Tokens are easily accessible anywhere in the app
When tokens change, all components showing them update automatically
Simpler than other state management solutions like Redux
Works well with the cookie/JWT system we have
This pattern is commonly used for managing authentication state across an application.
*/





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