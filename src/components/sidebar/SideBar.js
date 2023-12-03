import React, { useEffect } from 'react'
import { useState } from 'react'
import CardUser from '../carduser/CardUser'
import CardRoom from '../cardroom/CardRoom'
import HTTP from '@/utils/HTTP'
function SideBar(props) {
  const [chatRoom, setChatRoom] = useState()
  const [rooms, setRooms] = useState()
  const [chatUser, setChatUser] = useState()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getChatRooms = () => {
      HTTP.get("chat/api/chatroom").then((res) => {
        if(res.status === 200) {
          setRooms(res.data)
        }
        else {
          console.log(res);
        }
      })
    }
    getChatRooms()
  }, [])

  return (
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
    </div>
  )
}

export default SideBar