import React from 'react'
import LoginForm from '@/components/login-form/LoginForm'

function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-light-1 px-4">
      <div className="w-1/3 bg-white rounded-large h-fit p-5">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage