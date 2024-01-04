import React, { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import './ChatbodyStyle.css'
import HTTP from '@/utils/HTTP';
import clsx from 'clsx';
import Cookies from 'js-cookie';

if (typeof window !== "undefined") {
  var account = JSON.parse(localStorage.getItem("account"))
}
var socket = new WebSocket("ws://localhost:8000/ws/" + Cookies.get("userId")+ "/");

function ChatBody({ match, currentChattingMember }) {
  const [inputMessage, setInputMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [userList, setUserList] = useState([])
  const [userOnline, setUserOnline] = useState([])

  socket.onmessage = (e) => {
    console.log(e.data);
    const data = JSON.parse(e.data);
    if (data.type === "chat_message" && data.chatroom === currentChattingMember.id) {
      setMessages((messages) => [...messages, data]);
      const chatBody = document.getElementById('chatbody')
      setTimeout(() => {
        if (chatBody) {
          chatBody.scrollTop = chatBody.scrollHeight
        }
      }, 100)
      // fetchChatMessage()
    }
  }

  useEffect(() => {
    if (currentChattingMember.id) {
      fetchChatMessage();
      fetchUserList();
    }
  }, [currentChattingMember.id])

  const fetchChatMessage = async () => {
    if(currentChattingMember.id) {
      HTTP.get(`chat/api/chatroommessage/${currentChattingMember.id}/`).then((response) => {
        if(response.status === 200) {
          setMessages(response.data.reverse())
        }
      })
      let chatBody = document.getElementById('chatbody')
      setTimeout(() => {
        chatBody.scrollTop = chatBody.scrollHeight
      }, 100)
    }
  };
  const fetchUserList = async () => {
    HTTP.get(`chat/api/chatroom/${currentChattingMember.id}/`).then((response) => {
      if(response.status === 200) {
        setUserList(response.data.member)
      }
    })
  }
  const messageSubmitHandler = (event) => {
    event.preventDefault();
    if (inputMessage) {
      const data = {
        type: "message",
        message: inputMessage,
        userList: userList.map((user) => user.id),
        userId: Cookies.get("userId"),
        roomId: currentChattingMember.id,
      };
      try {
        socket.send(JSON.stringify(data));
      } catch (error) {
        socket = new WebSocket("ws://localhost:8000/ws/" + Cookies.get("userId")+ "/");
        console.log(error);
      }
      setInputMessage("");
    }
  }
  
  return (
    <div>
      {
      currentChattingMember.id? (
        <div className=' w-full'>
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

            {/* more info */}
            <div className='ml-auto flex gap-2'>
              <div className='cursor-pointer'>
                <img src="/threedot.png" className='w-6 h-6'/>
              </div>
            </div>
           
          </div>

          <div className=''>
            <div className='chatbody overflow-y-auto' id='chatbody'>{
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
                <input type="text" className='w-full border p-2 border-gray-light rounded-lg' placeholder='Type message' 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      messageSubmitHandler(e)
                    }
                  }}
                />
              </div>
            </div>
          
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center'>
          <div className='text-2xl text-gray'>Please select a chat to start messaging</div>
        </div>
      )
    }
    </div>
  )
}

export default ChatBody
