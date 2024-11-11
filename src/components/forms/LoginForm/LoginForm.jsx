import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().min(1, "it can't be empty!"), //the sequence of writing the z.objects are important. If we write z.email().string() it gives us error
  password: z.string().min(1, "it can't be empty!"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  return (
    //the default for the tailwind classes is for the size of the mobile
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="border-2 rounded-xl shadow-md p-4 flex flex-col gap-4 lg:w-[30%] w-[80%]"
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
          errors?.email?.message ? "border-red-400":"border-slate-400"
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
        <p className="text-red-600">{errors.email.message}</p>//Uses optional chaining (?.) to safely check if the error exists The && operator only renders the <p> tag if errors.email.message exists If there's no error, nothing is rendered
      )}

      <input
        {...register("password")}
        className={`${
          errors?.password?.message ? "border-red-400":"border-slate-400"
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
        Login
      </button>
    </form>
  );
};

export default LoginForm;
