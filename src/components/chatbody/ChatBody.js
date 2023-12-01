import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import './ChatbodyStyle.css'

function ChatBody({ match, currentChattingMember, setOnlineUserList }) {
  const [inputMessage, setInputMessage] = useState("")
  const [messages, setMessages] = useState({})
  const [typing, setTyping] = useState(false)
  
  return (
    <div className='block w-full h-screen'>
      <div className="flex items-center p-4 border-b border-gray-light h-20">
        <Image 
          src='/avt-default.png'
          alt='avt'
          width={48}
          height={48}
        />
        <div className="pl-3">
          <strong>{currentChattingMember?.full_name}</strong>
        </div>
      </div>

      <div className='block'>
        <div className='chatbody'>
          Box
        </div>
        <div className='chatinput flex h-14'>
          <div className='flex w-full py-6 px-2 items-center'>
            <input type="text" className='w-full border p-2 border-gray-light rounded-l-lg' placeholder='Type message' 
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button className='px-5 py-2 bg-red-dark-2 rounded-r-lg text-white' onClick={()=>{}} disabled={!inputMessage}>Send</button>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default ChatBody
