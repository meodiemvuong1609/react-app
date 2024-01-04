import React from 'react'
import { useState, useEffect } from 'react'
import HTTP from '@/utils/HTTP'
import { toast } from 'react-toastify';
function CreateRoom(props) {
  const [members, setMembers] = useState([])
  const [payload, setPayload] = useState({
    title: '',
    type: 'PUBLIC',
    account: []
  })
  useEffect(() => {
    const getMembers = () => {
      HTTP.get("account/api/userselect/").then((res) => {
        if(res.status === 200) {
          setMembers(res.data)
        }
      })
    }
    getMembers()
  }, [])

  const handleCreateRoom = () => {
    HTTP.post("chat/api/chatroom/", payload).then((res) => {
      if(res.status === 200) {
        props.setIsPopup(false)
        toast("Create room success !", {title: "Notification"});

      }
    })
  }


  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='w-1/3 bg-white rounded-large h-fit p-5'>
        <div className='text-center text-xl font-bold'>Create Room</div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium'>Title</p>
            <input type="text" className='w-full rounded-lg p-3 border border-gray-light text-sm' placeholder='Type title' 
              onChange={(e) => setPayload({...payload, title: e.target.value})}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium'>Type</p>
            <select className='w-full rounded-lg p-3 border border-gray-light text-sm' onChange={(e) => setPayload({...payload, type: e.target.value})}>
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium'>Members</p>
            <select className='w-full rounded-lg p-3 border border-gray-light text-sm' multiple onChange={(e) => setPayload({...payload, account: [...payload.account, e.target.value]})}>
              {members?.map((member, index) => {
                return (
                  <option key={index} value={member.id}>{member.fullname}</option>
                )
              })}
            </select>
          </div>
          <div className='flex justify-center gap-2'>
            <button className='bg-gray rounded-lg px-4 py-2 text-white ' onClick={() => props.setIsPopup(false)}>Cancel</button>
            <button className=' bg-blue rounded-lg px-4 py-2 text-white' onClick={handleCreateRoom}>Create</button>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default CreateRoom