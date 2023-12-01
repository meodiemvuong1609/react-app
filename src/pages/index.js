import React from 'react'
import { useState } from 'react';
import Sidebar from '@/components/sidebar/SideBar'
import ChatBody from '@/components/chatbody/ChatBody';
function HomePage(props) {
  const [currentChattingMember, setCurrentChattingMember] = useState({});
  const [onlineUserList, setOnlineUserList] = useState([]);
  
  return (
    <div className="h-screen flex">
      <div className='flex w-full gap-3'>
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

export default HomePage