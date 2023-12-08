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
      })
    }
    getChatRooms()
  }, [isPopup])

  const handleCreateRoom = () => {
    setIsPopup(true)
  }

  return (
    <div className='h-full relative'>
      <div className='block'>
      {rooms?.map((room, index) => {
        return (
          <div onClick={() => {
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
      <button className=' absolute py-2 px-3 bg-red text-white rounded-lg bottom-2 left-2'
        onClick={handleCreateRoom}
      >Create room</button>
      {isPopup && <CreateRoom setIsPopup={setIsPopup}/> }
    </div>
  )
}

export default SideBar