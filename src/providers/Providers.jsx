import React from "react";
import { useEffect } from "react";
import { getCookie } from "../utils/helpers/cookie";

const Authorize = () => {
  useEffect(() => {
    const readCookie = async () => {
      const result = await getCookie("credential");
      console.log(result);
    };
    readCookie();
  }, []);
};

const Provider = ({children}) => {
  return <Authorize>{children}</Authorize>;
};
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
