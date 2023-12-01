import React, { useEffect } from 'react'
import { useState } from 'react'
import CardUser from '../carduser/CardUser'
function SideBar(props) {
  const [chatUser, setChatUser] = useState()
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers([
      {
        id: 1,
        full_name: 'John Doe',
        email: '1',
        is_online: false
      },
      {
        id: 2,
        full_name: 'John Doe 2',
        email: '1',
        is_online: false
      },
    ])
    setChatUser(users[0])
  }, [])
  console.log(chatUser);

  return (
    <div className='block'>
      {users.map((user, index) => {
        return (
          <div onClick={() => {
            props.setCurrentChattingMember(user);
            setChatUser(user);
          }}>
            <CardUser key={index} user={user} chatUser={chatUser}/>
          </div>
        )
      })}
    </div>
  )
}

export default SideBar