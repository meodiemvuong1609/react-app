import React from 'react'
import { useState } from 'react';
import Sidebar from '@/components/sidebar/SideBar'
import ChatBody from '@/components/chatbody/ChatBody';
import Header from '@/components/header/Header';
import RequireAuth from '@/components/requireauth/RequireAuth';
function HomePage(props) {
  const [currentChattingMember, setCurrentChattingMember] = useState({});
  const [onlineUserList, setOnlineUserList] = useState([]);
  
  return (
    <div className=" h-screen">
      <div className=''>
        <Header />
      </div>
      <hr className='border-gray-light'/>
      <div className='flex w-full gap-3 max-h-fit'>
        <div className="w-1/5 border-r border-gray-light">
          <Sidebar 
            setCurrentChattingMember={setCurrentChattingMember}
            onlineUserList={onlineUserList}
          />
        </div>
        <div className="w-4/5">
          <ChatBody 
            setOnlineUserList={setOnlineUserList}
            currentChattingMember={currentChattingMember}
          />
        </div>
      </div>
    </div>
  )
}

export default RequireAuth(HomePage)