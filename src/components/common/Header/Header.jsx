import React from 'react'
import { useStore } from '../../../store'

const Header = () => {
    const {access_token} = useStore();
  return (
   <header className='px-4'>
    <div className='flex justify-between items-center bg-slate-700 p-4'>
        <p>
            <span>react ecommerce</span>
        </p>
        <button>
            {access_token != null && access_token != undefined ? (
                <span>dashboard</span>
            ):(
                <span>login/signup</span>
            )}
        </button>
    </div>
   </header>
  )
}

export default Header