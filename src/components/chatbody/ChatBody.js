import React, { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import './ChatbodyStyle.css'
import HTTP from '@/utils/HTTP';
import clsx from 'clsx';
import Cookies from 'js-cookie';

let isTypingSignalSent = false;
let typingTimer = 0;

if (typeof window !== "undefined") {
  var account = JSON.parse(localStorage.getItem("account"))
}
var socket = new WebSocket("ws://localhost:8000/ws/" + Cookies.get("userId")+ "/");

function ChatBody({ match, currentChattingMember }) {
  const [inputMessage, setInputMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [userList, setUserList] = useState([])
  const [userOnline, setUserOnline] = useState([])
  const [typing, setTyping] = useState(false)

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === "chat_message") {
      fetchChatMessage()
    }
  }

  useEffect(() => {
    if (currentChattingMember.id) {
      fetchChatMessage();
      fetchUserList();
    }
  }, [currentChattingMember.id])

  const chatMessageTypingHandler = (event) => {
    // if (event.keyCode !== 13) {
    //   if (!isTypingSignalSent) {
    //     sendTypingSignal(true);
    //     isTypingSignalSent = true;
    //   }
    //   clearTimeout(typingTimer);
    //   typingTimer = setTimeout(() => {
    //     sendTypingSignal(false);
    //     isTypingSignalSent = false;
    //   }, 3000);
    // } else {
    //   clearTimeout(typingTimer);
    //   isTypingSignalSent = false;
    // }
  };
  const fetchChatMessage = async () => {
    if(currentChattingMember.id) {
      HTTP.get(`chat/api/chatroommessage/${currentChattingMember.id}/`).then((response) => {
        if(response.status === 200) {
          setMessages(response.data.reverse())
        }
      })
    }
  };
  const fetchUserList = async () => {
    HTTP.get(`chat/api/chatroom/${currentChattingMember.id}/`).then((response) => {
      if(response.status === 200) {
        setUserList(response.data.member)
        response.data.member.map((user) => {
          if(user.is_online) {
            setUserOnline((userOnline) => [...userOnline, user.id])
          }
        }
        )
      }
    })
  }
  const sendTypingSignal = (typing) => {
    socket.send(
      JSON.stringify({
        action: "typing",
        typing: typing,
        user: userOnline,
        roomId: currentChattingMember.id,
      })
    );
  };
  const messageSubmitHandler = (event) => {
    event.preventDefault();
    if (inputMessage) {
      const data = {
        type: "message",
        message: inputMessage,
        userList: userOnline,
        userId: account.id,
        roomId: currentChattingMember.id,
      };
      socket.send(JSON.stringify(data));
      setInputMessage("");
    }
  }
  
  
  
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
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyUp={chatMessageTypingHandler}
            />
            <button className='px-5 py-2 bg-red-dark-2 rounded-r-lg text-white' onClick={messageSubmitHandler} disabled={!inputMessage}>Send</button>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default ChatBody
