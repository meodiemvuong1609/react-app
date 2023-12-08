import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import HTTP from '@/utils/HTTP'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    if (username == '' || password == '' || email == '' || fullname == '') {
      setError(true)
      setErrorMessage('Please fill all fields')
      return
    }


    const response = await HTTP.post('account/api/register/', {
      username,
      email,
      fullname,
      password,
    })
    if (response.data.code == 200) {
      router.push('/auth/login')
    }
    else {
      setError(true)
      setErrorMessage(response.data.message)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-light-1 px-4">
      <div className="w-1/2 bg-white rounded-large h-fit p-5">
      <div className="register flex flex-col gap-4">
        <div className="title font-bold text-xl pb-6">
          Register
        </div>
        <div className="input__container flex flex-col gap-1">
            <p className='text-sm font-medium'>Fullname</p>
            <input type="text" className='w-full rounded-lg p-3 border border-gray-light text-sm' placeholder='Type username' 
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="input__container flex flex-col gap-1">
            <p className='text-sm font-medium'>Email</p>
            <input type="text" className='w-full rounded-lg p-3 border border-gray-light text-sm' placeholder='Type username' 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input__container flex flex-col gap-1">
            <p className='text-sm font-medium'>Username</p>
            <input type="text" className='w-full rounded-lg p-3 border border-gray-light text-sm' placeholder='Type username' 
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input__container flex flex-col gap-1">
            <p className='text-sm font-medium'>Password</p>
            <input type="password" className='w-full rounded-lg p-3 border border-gray-light text-sm' placeholder='Type password' 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="message flex gap-1">
            {error && <p className='text-sm font-normal text-red'>{errorMessage}</p>}
          </div>
          <button className='w-full bg-red rounded-lg text-white px-4 py-3 text-sm' 
            onClick={handleRegister}
          >Register</button>
          <div className="message flex gap-1 justify-center">
            <p className=' text-sm font-normal'>You have account? <a href="/auth/register" className='text-blue'>Login</a></p>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default RegisterPage