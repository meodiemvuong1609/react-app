import React, { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import './ChatbodyStyle.css'
import HTTP from '@/utils/HTTP';
import clsx from 'clsx';

let isTypingSignalSent = false;
let typingTimer = 0;

function ChatBody({ match, currentChattingMember }) {
  const [inputMessage, setInputMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  let account = null
  if (typeof window !== "undefined") {
    account = JSON.parse(localStorage.getItem("account"))
  
  }

  const chatMessageTypingHandler = (event) => {
    if (event.keyCode !== 13) {
      if (!isTypingSignalSent) {
        sendTypingSignal(true);
        isTypingSignalSent = true;
      }
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        sendTypingSignal(false);
        isTypingSignalSent = false;
      }, 3000);
    } else {
      clearTimeout(typingTimer);
      isTypingSignalSent = false;
    }
  };
  
  const fetchChatMessage = async () => {
    if(currentChattingMember.id) {
      HTTP.get(`chat/api/chatroommessage/${currentChattingMember.id}/`).then((response) => {
        if(response.status === 200) {
          setMessages(response.data)
        }
      })
    }
  };
  const sendTypingSignal = (typing) => {
    // socket.send(
    //   JSON.stringify({
    //     action: SocketActions.TYPING,
    //     typing: typing,
    //     user: CommonUtil.getUserId(),
    //     roomId: CommonUtil.getActiveChatId(match),
    //   })
    // );
  };
  useEffect(() => {
    fetchChatMessage()
  }, [currentChattingMember.id])
  
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
          <strong>{currentChattingMember?.title}</strong>
        </div>
      </div>

      <div className='block'>
        <div className='chatbody'>{
          messages?.map((message, index) => {
            return (
              <div className={clsx("p-2 flex gap-3", {"flex-row-reverse": account.id==message.account} )} key={index}>
                <Image 
                  src='/avt-default.png'
                  alt='avt'
                  width={48}
                  height={48}
                />
                <div className='w-max rounded-lg p-2 bg-red-light-4'>{message.message}</div>
              </div>
            )})
        }
        </div>
        <div className='chatinput flex h-14'>
          <div className='flex w-full py-6 px-2 items-center'>
            <input type="text" className='w-full border p-2 border-gray-light rounded-l-lg' placeholder='Type message' 
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyUp={chatMessageTypingHandler}
            />
            <button className='px-5 py-2 bg-red-dark-2 rounded-r-lg text-white' onClick={()=>{}} disabled={!inputMessage}>Send</button>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default ChatBody
