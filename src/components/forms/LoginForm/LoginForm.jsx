import React from 'react'

const LoginForm = () => {
  return (//the default for the tailwind classes is for the size of the mobile
    <form className='border-2 rounded-xl shadow-md p-4 flex flex-col gap-4 lg:w-[30%] w-[80%]'>
      <input className='w-[100%] py-2 px-4 border-2 border-slate-400 focus:border-slate-600 rounded-md' type='text' name='email' id='email' placeholder='Enter email'/>
      <input className='w-[100%] py-2 px-4 border-2 border-slate-400 focus:border-slate-600 rounded-md'type='password' name='password' id='password' placeholder='Enter password'/>
      <button className='w-[100%] bg-slate-600 text-slate-50 rounded-md py-2 px-4' type='submit'>LogIn</button>
    </form>
  )
}

export default LoginForm