
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';


function Header() {
  const [user, setUser] = useState()
  const [isPopup, setIsPopup] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const account = JSON.parse(localStorage.getItem("account"))
      if (account) {
        setUser(account)
      }
    }
  }, [])

  return (
    <div className='flex p-4'>
      <div className=' w-1/6 flex items-center justify-center'>
        <div className='text-xl font-medium'>ChatApp</div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-end'>
          <div className='flex flex-col justify-center'>
            <div className='text-sm font-medium'>{user?.fullname}</div>
          </div>
          <div className='flex justify-center items-center cursor-pointer'
            onClick={() => {
              setIsPopup(!isPopup)
            }}
          >
          <img src="/avt-default.png" className='w-10 h-10 rounded-full'/>
          </div>
          {isPopup && <div className='absolute right-2 top-16 bg-white rounded-lg shadow-lg'>
              <div className='py-2 px-4 hover:bg-gray-light cursor-pointer'
                onClick={() => {
                }}
              >Profile</div>
            <div className='py-2 px-4 hover:bg-gray-light cursor-pointer'
              onClick={() => {
                Cookies.remove('userId')
                localStorage.removeItem('account')
                toast("Logout success !", {title: "Notification"});
                router.push('/auth/login')

              }}
            >Logout</div>
          </div>}
        </div>
      </div>
    </div>
    
  )
}

export default Header