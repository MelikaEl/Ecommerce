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
import {useNavigate} from "react-router-dom";

const loginSchema = z.object({
  name: z.string(4,"at least 4 characters"),//everything that is defined in the schema should be registered in the form
  email: z.string().min(1, "it can't be empty!").email("enter a valid email"), //the sequence of writing the z.objects are important. If we write z.email().string() it gives us error
  password: z.string().min(1, "at least 4 characters"),
  avatar: z.string(),
});

const SignupForm = () => {
  const { setState } = useStore();
  const navigate= useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleSignup = async (data) => {
    console.log(data)
  };

  return (
    
    <form
      onSubmit={handleSubmit(async (data) => await handleSignup(data))}
      className="border-2 rounded-xl shadow-md p-4  lg:w-[30%] w-[80%]"
    >
      <fieldset
        disabled={isSubmitting}
       className="flex flex-col gap-4"
      >
        <input type="hidden" name="avatar" {...register("avatar")}/>
        <input
          {...register(
            "name"
          )} 
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





