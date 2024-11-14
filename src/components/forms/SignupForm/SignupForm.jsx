// import React from 'react'

// const SignupForm = () => {
//   return (
//     <div>SignupForm</div>
//   )
// }

// export default SignupForm

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import loginApi from "../../../utils/apis/auth/loginApi";
import { toast } from "react-toastify";
import useStore from "../../../store";
import { setCookie } from "../../../utils/helpers/cookie";
import { useNavigate } from "react-router-dom";

const loginSchema = z
  .object({
    name: z.string(4, "at least 4 characters"), //everything that is defined in the schema should be registered in the form
    email: z.string().min(1, "it can't be empty!").email("enter a valid email"), //the sequence of writing the z.objects are important. If we write z.email().string() it gives us error
    password: z.string().min(1, "at least 4 characters"),
    avatar: z.string(),
    gender: z.string(),
  })
  .refine((data) => data.avatar=`https://avatar.iran.liara.run/public/${data.gender}`);
/*
`refine` in Zod schema is used for custom validation logic. Let me explain its functionality:

1. **Basic Purpose**:
````javascript:src/components/forms/SignupForm/SignupForm.jsx
const loginSchema = z.object({
    // ... schema fields ...
}).refine((data) => console.log(data));  // Currently just logs data
````


2. **How it should be used**:
````javascript
// Better example of refine usage:
const loginSchema = z.object({
    name: z.string(),
    password: z.string(),
}).refine(
    (data) => {
        // Custom validation logic
        return someCondition; // Must return boolean
    },
    {
        message: "Custom error message",  // Shown if validation fails
        path: ["fieldName"]  // Which field caused the error
    }
);
````


3. **Common use cases**:
````javascript
// Example: Password confirmation
const signupSchema = z.object({
    password: z.string(),
    confirmPassword: z.string()
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords don't match",
        path: ["confirmPassword"]
    }
);

// Example: Age validation
const userSchema = z.object({
    age: z.number()
}).refine(
    (data) => data.age >= 18,
    {
        message: "Must be 18 or older"
    }
);
````


4. **In your code**:
- Currently only logs data
- Not performing any validation
- Should be modified to include actual validation logic if needed

`refine` is powerful for:
- Complex validation rules
- Cross-field validation
- Custom validation logic
- Adding conditional validation
*/

const SignupForm = () => {
  // const { setState } = useStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleSignup = async (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => await handleSignup(data))}
      className="border-2 rounded-xl shadow-md p-4  lg:w-[30%] w-[80%]"
    >
      <fieldset disabled={isSubmitting} className="flex flex-col gap-4">
        <input
          type="hidden"
          name="avatar"
          {...register("avatar")}
          /*
The `type="hidden"` input field serves a specific purpose in forms. Let me explain:

1. **Purpose**:
````javascript:src/components/forms/SignupForm/SignupForm.jsx
<input 
    type="hidden"  // Not visible to users
    name="avatar"  
    {...register("avatar")} // Still part of form data
/>
````

2. **Key characteristics**:
- Not visible in the UI
- Still sends data with form submission
- Can be accessed via JavaScript
- Part of form validation

3. **Common use cases**:
- Default values
- System-generated data
- Tracking information
- In this case, likely a default avatar URL

4. **Example of how it works**:
````javascript
// Hidden input with default value
<input 
    type="hidden" 
    {...register("avatar")} 
    value="https://default-avatar-url.com/image.png"
/>

// When form submits, this data is included:
{
    email: "user@example.com",
    password: "****",
    avatar: "https://default-avatar-url.com/image.png"  // Included but not visible
}
````

In your signup form, it's likely used to:
- Provide a default avatar for new users
- Pass system-generated avatar URLs
- Include required data without showing it to users

This is different from a regular input field which would be visible and editable by users.
        */
        />

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
        />
        {errors?.email?.message && (
          <p className="text-red-600">{errors.email.message}</p> //Uses optional chaining (?.) to safely check if the error exists The && operator only renders the <p> tag if errors.email.message exists If there's no error, nothing is rendered
        )}

        <input
          {...register("name")}
          className={`${
            errors?.email?.message ? "border-red-400" : "border-slate-400"
          }  w-[100%] py-2 px-4 border-2 border-slate-400 focus:border-slate-600 rounded-md`}
          type="text"
          name="name"
          id="name"
          placeholder="Enter name"
        />

        {errors?.name?.message && (
          <p className="text-red-600">{errors.name.message}</p>
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

        <div className="flex flex-col">
          <div className="flex gap-4">
            <input
              {...register("gender")}
              type="radio"
              value="boy"
              name="gender"
              id="male"
              defaultChecked
            />
            <label
              htmlFor="male" /*the htmlFor is used for when I select the words of the label of a option based selection its selected but if the htmlFor doesn't exist when we select the words of the option, nothing happens and for selection we shouls select the option of that not the word of that*/
            >
              Male
            </label>
          </div>
          <div className="flex gap-4">
            <input
              {...register("gender")}
              type="radio"
              value="girl"
              name="gender"
              id="female"
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        <button
          className="w-[100%] bg-slate-600 text-slate-50 rounded-md py-2 px-4"
          type="submit"
        >
          {isSubmitting ? "Logginig..." : "Login"}
        </button>
      </fieldset>
    </form>
  );
};

export default SignupForm;
