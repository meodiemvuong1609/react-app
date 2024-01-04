import React, { useEffect } from 'react'
import { useState } from 'react'
import CardRoom from '../cardroom/CardRoom'
import HTTP from '@/utils/HTTP'
import CreateRoom from '@/components/createroom/CreateRoom'
function SideBar(props) {
  const [chatRoom, setChatRoom] = useState()
  const [rooms, setRooms] = useState()
  const [isPopup, setIsPopup] = useState(false)

  useEffect(() => {
    const getChatRooms = () => {
      HTTP.get("chat/api/chatroom").then((res) => {
        if(res.status === 200) {
          setRooms(res.data)
          console.log();
        }
        else {
          console.log(res);
        }
      }).catch((err) => {
        console.log(err);
      })
    }
    getChatRooms()
  }, [isPopup])

  const handleCreateRoom = () => {
    setIsPopup(true)
  }

  return (
    <div>
      <div className='flex justify-between items-center py-2 px-4'>
        <div className='text-xl font-medium'>ChatApp</div>
        <div className='cursor-pointer' onClick={handleCreateRoom}>
          <img src="/add.png" className='w-6 h-6'/>
        </div>
      </div>
      <div className='block'>
      {rooms?.map((room, index) => {
        return (
          <div  key={index} onClick={() => {
            props.setCurrentChattingMember(room);
            setChatRoom(room);
          }}>
            <CardRoom key={index} room={room} chatRoom={chatRoom}/>
          </div>
        ) 
      })}
      {
        rooms?.length == 0 && (
          <div className='text-center py-2'>No room found</div>
        )
      }
      </div>
      {isPopup && <CreateRoom setIsPopup={setIsPopup}/> }
    </div>
  )
}

export default SideBar