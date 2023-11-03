import React from 'react'

function LoginForm() {
  return (
    <div className="loginform flex flex-col gap-4">
    <div className="title font-bold text-xl pb-6 pt-16">
      Login
    </div>
      <div className="input__container flex flex-col gap-1">
        <p className='text-sm font-medium'>Username</p>
        <input type="text" className='w-full rounded-lg p-3 border border-gray-light text-sm' placeholder='Type username' />
      </div>
      <div className="input__container flex flex-col gap-1">
        <p className='text-sm font-medium'>Password</p>
        <input type="password" className='w-full rounded-lg p-3 border border-gray-light text-sm' placeholder='Type password' />
      </div>
      <div className="checkbox flex gap-1">
        <input type="checkbox" className='' />
        <p className='text-sm font-normal'>Remember me</p>
      </div>
      <button className=' w-full bg-red rounded-lg text-white px-4 py-3 text-sm'>Login</button>
    </div>
  )
}

export default LoginForm