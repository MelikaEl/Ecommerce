import React from "react";
import { useEffect } from "react";
import { getCookie } from "../utils/helpers/cookie";
import { setCookie } from "../utils/helpers/cookie";
import useStore from "../store";

const Authorize = ({ children }) => {
  const { setState } = useStore();
  useEffect(() => {
    const readCookie = async () => {
      //first we set cookie and comment the get cookie then comment the set cookie and uncomment the get cookie
    
      // await setCookie("credential", {
      //   access_token: "hbjhbjniijoij8787876hbhjb",
      //   refresh_token: "khbjnkmlkjjnuh76765fhgvhgv",
      // });

      const result = await getCookie("credential");//we can see the credential that has the coockie saved on it in the application tab of the developer toold
      setState(result);
      console.log(result);
    };
    readCookie();
  }, []);
  return <>{children}</>;
};

const Provider = ({ children }) => {
  return <Authorize>{children}</Authorize>;
};

/*
explain simple why in this code we use children prop.

Let me explain the use of the `children` prop in this code in simple terms:

The `children` prop is used here for component composition - it allows these components to wrap other components while passing through their content. Here's why it's important:

1. In the `Provider` component:

```21:23:src/providers/Providers.jsx
const Provider = ({children}) => {
  return <Authorize>{children}</Authorize>;
};
```

- Takes whatever components are passed to it as children
- Wraps them with the `Authorize` component
- This is used in main.jsx where it wraps the entire App:

```8:12:src/main.jsx
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
```


2. In the `Authorize` component:

```7:19:src/providers/Providers.jsx
const Authorize = ({children}) => {
  const {setState}=useStore();
  useEffect(() => {
    const readCookie = async () => {
      // setCookie("credential",{access_token:"hbjhbjniijoij8787876hbhjb",refresh_token:"khbjnkmlkjjnuh76765fhgvhgv"})
      const result = await getCookie("credential");//we can see the credential that has the coockie saved on it in the application tab of the developer toold
      setState(result);
      console.log(result);
    };
    readCookie();
  }, []);
  return <>{children}</>
};
```

- Receives the children from Provider
- Does its authentication/cookie checking work
- Renders the children components using `<>{children}</>`

Think of it like nesting Russian dolls:
- Provider is the outer doll
- Authorize is the middle doll
- Your App and its components are the inner dolls

This pattern is useful because it:
- Allows authentication logic to wrap the entire application
- Keeps the authentication code separate from the application code
- Lets components inside access the authentication state
- Maintains a clean component hierarchy

Without the `children` prop, these components would be dead ends and couldn't wrap other components, making them much less useful for application-wide features like authentication.
*/

/*
Let me explain this Provider code in simple terms:

There are two components here:

1. `Authorize` Component:
   - Uses `useEffect` to run code when the component loads
   - Has a function called `readCookie` that:
     - Gets the "credential" cookie we set earlier
     - Decrypts it using our JWT functions (from lines 40-50 in jwt.js)
     - Logs the decrypted data to the console

2. `Provider` Component:
   - Takes `children` as a prop (other components that will be wrapped by this provider)
   - Wraps these children with the `Authorize` component

However, there's a bug in this code. The `Authorize` component doesn't return anything, which means it won't render the children. Here's how it should be fixed:

```javascript
const Authorize = ({ children }) => {
  useEffect(() => {
    const readCookie = async () => {
      const result = await getCookie("credential");
      console.log(result);
    };
    readCookie();
  }, []);

  return <>{children}</>;
};
```

This pattern is commonly used for:
- Authentication checks
- Loading user data on app startup
- Protecting routes
- Providing global context to child components

When used in `main.jsx` (lines 7-10), it wraps the entire application, meaning this cookie check will happen when the app first loads.

Think of it like a security guard at the entrance of a building:
- The guard (Authorize) checks your credentials (cookie)
- Once verified, allows access to everything inside the building (children components)
- The building itself (Provider) is just the structure that holds everything together
*/

export default Provider;
