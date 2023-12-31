import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react'
import { useRouter } from 'next/router'
import HTTP from '@/utils/HTTP'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';


function LoginForm() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const dispatch = useDispatch();
  const handleLogin = async () => {
    
    const response = await HTTP.post('auth/api/login/', {
      username,
      password,
    })
    if (response.data.code == 200) {
      HTTP.get("account/api/me/").then((res) => {
        if(res.status==200) {
          Cookies.set('userId', res.data.id)
          localStorage.setItem("account", JSON.stringify(res.data))
          toast("Login success !", {title: "Notification"});
          dispatch({type: 'LOGIN', payload: res.data})
          router.push('/')
        }
      })
      router.push('/')
    }
    else {
      setError(true)
      setErrorMessage(response.data.message)
    }

  }

  return (
    <div className="loginform flex flex-col gap-4">
    <div className="title font-bold text-xl py-6">
      Login
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
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleLogin()
            }
          }}
        />
      </div>
      <div className="message flex gap-1">
        {error && <p className='text-sm font-normal text-red'>{errorMessage}</p>}
      </div>
      <button className='w-full bg-red rounded-lg text-white px-4 py-3 text-sm' 
        onClick={handleLogin}
      >Login</button>
      <div className="message flex gap-1 justify-center">
        <p className=' text-sm font-normal'>Don't have an account? <a href="/auth/register" className='text-blue'>Register</a></p>
      </div>
    </div>
  )
}

export default LoginForm;