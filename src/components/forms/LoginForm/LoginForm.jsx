import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import loginApi from "../../../utils/apis/auth/loginApi";
import { toast } from "react-toastify";
import useStore from "../../../store";
import { setCookie } from "../../../utils/helpers/cookie";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.string().min(1, "it can't be empty!").email("enter a valid email"), //the sequence of writing the z.objects are important. If we write z.email().string() it gives us error
  password: z.string().min(1, "it can't be empty!"),
});
//In the login page. if we put the email and password of the platzi fake store API and it gives error, I should turn off the web access protection of the ESET security.
const LoginForm = () => {
  const { setState, access_token } = useStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    // console.log(access_token);
    if (access_token != null && access_token != undefined) {
      toast.warn("you are already logged in!");
      navigate("/dashboard");
    }
  }, []);
  /*
the user that is logged in, can't logged in or sign up again and it inderstands that by knowing that the access token
is already exists in the cookie or not. If you are in the Login page and refresh the page, if you already logged in 
the login page doesn't appear again or if you already signed up and refresh the page, the sign up page doesn't appear
again.
*/

  const handleLogin = async (data) => {
    // toast.error("djhbsdbsdvjhbjjnvnnjsddnvj")

    const result = await loginApi(data);
    if (result?.status == 200 || result?.status == 201) {
      const access_token = result?.data?.access_token;
      const refresh_token = result?.data?.refresh_token;
      // console.log(access_token, refresh_token);
      await setCookie("credential", {
        //"credential" in this code is simply a key name for storing authentication tokens in the browser's cookies. Instead of credential we can set any desired name and this name is used for storing the tokens in the cookie of the browser.
        access_token: access_token,
        refresh_token: refresh_token,
      });
      // console.log(result);
      setState({ access_token: access_token, refresh_token: refresh_token });
      toast.success("logged in successfully , redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 1000); //navigate to dashboard after 1 second
    } else toast.error("invalid username password!");
    /*
    Let me explain this code block in detail:

1. **Check API Response Status**:
```javascript
if (result?.status == 200 || result?.status == 201)
```
- Checks if login was successful (HTTP status 200 or 201)
- Uses optional chaining (`?.`) to safely access status

2. **Extract Tokens**:
```javascript
const access_token = result?.data?.access_token;
const refresh_token = result?.data?.refresh_token;
```
- Gets authentication tokens from API response
- `access_token`: Used for API requests
- `refresh_token`: Used to get new access token when it expires

3. **Save to Cookie**:
```javascript
await setCookie("credential", {
    access_token: access_token,
    refresh_token: refresh_token,
})
```
- Stores tokens in browser cookies securely
- Uses the `setCookie` function defined in:

```4:5:src/utils/helpers/cookie.js
export const setCookie = async (key,data)=>
    Cookies.set(key, await encryptJWT(data));
```


4. **Update Global State**:
```javascript
setState({access_token:access_token,refresh_token:refresh_token})
```
- Updates application's global state with tokens
- Makes tokens available throughout the app
- Uses Zustand store for state management

5. **Error Handling**:
```javascript
else toast.error("invalid username password!");
```
- Shows error message if login fails
- Uses react-toastify for displaying error notifications

This code is crucial for:
- Handling successful login
- Storing authentication credentials
- Managing user sessions
- Providing feedback to users
- Setting up authenticated API requests

The tokens are used by the axios interceptor defined in:

```22:28:src/constants/axios-interceptor.js
export const apiClient = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    // the headers of the API requests append additional data and here the additional data is the token
    Authorization: `Bearer ${await getAccessToken()}`,
  },
});
```

    */
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => await handleLogin(data))}
      className="border-2 rounded-xl shadow-md p-4 lg:w-[30%] w-[80%]"
    >
      <div className="mb-4 p-3 bg-slate-100 rounded-lg text-slate-700 text-sm">
      Please use this email address and password to log in. <br/>
      email address: john@mail.com <br/>
      password: changeme
      </div>

      <fieldset
        disabled={isSubmitting}
        className="flex flex-col gap-4"
      >
        <input
          {...register(
            "email"
          )} /* register is a core function in React Hook Form that registers form inputs for validation and data collection. Let me explain its functionality:
        Purpose:
        Registers an input field into React Hook Form
        Handles form validation
        Manages field value updates
        Provides event listeners (onChange, onBlur, etc.) */
          className={`${
            errors?.email?.message ? "border-red-400" : "border-slate-400"
          }  w-[100%] py-2 px-4 border-2 border-slate-400 focus:border-slate-600 rounded-md`}
          type="text"
          name="email"
          id="email"
          placeholder="Enter email"
          /* 

Let me break down this className string which uses template literals and conditional (ternary) styling:

1. **Conditional Styling**:
```javascript:src/components/forms/LoginForm/LoginForm.jsx
`${errors?.email?.message ? "border-slate-400" : "border-red-400"}`
```
- If `errors.email.message` exists (there's an error):
  - Uses `border-red-400` (red border)
- If no error:
  - Uses `border-slate-400` (gray border)

2. **Fixed Classes**:
- `w-[100%]`: Full width
- `py-2`: Padding top/bottom
- `px-4`: Padding left/right
- `border-2`: Border width
- `border-slate-400`: Default border color
- `focus:border-slate-600`: Darker border on focus
- `rounded-md`: Medium border radius

However, I notice there's a logic error in your conditional. It should be reversed:
```javascript:src/components/forms/LoginForm/LoginForm.jsx
className={`${
    errors?.email?.message ? "border-red-400" : "border-slate-400"
}  w-[100%] py-2 px-4 border-2 focus:border-slate-600 rounded-md`}
```

The correction above will:
- Show red border when there's an error
- Show gray border when input is valid

This makes more sense from a UX perspective as red typically indicates errors.*/
        />

        {errors?.email?.message && (
          <p className="text-red-600">{errors.email.message}</p> //Uses optional chaining (?.) to safely check if the error exists The && operator only renders the <p> tag if errors.email.message exists If there's no error, nothing is rendered
        )}

        <input
          {...register("password")}
          className={`${
            errors?.password?.message ? "border-red-400" : "border-slate-400"
          }  w-[100%] py-2 px-4 border-2 border-slate-400 focus:border-slate-600 rounded-md`}
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
        />
        {errors?.password?.message && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
        <button
          className="w-[100%] bg-slate-600 text-slate-50 rounded-md py-2 px-4"
          type="submit"
        >
          {isSubmitting ? "Logginig..." : "Login"}
        </button>
        <Link className="text-center underline text-xs" to="/signup">
          dont have an account? signup{" "}
        </Link>
      </fieldset>
    </form>
  );
};

export default LoginForm;
