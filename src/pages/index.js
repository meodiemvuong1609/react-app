import React from 'react'
import HTTP from '@/utils/HTTP'
function index() {
  const handleTest = async () => {
    const response = await HTTP.get('chat/api/chatroom/')
    console.log(response)
  }


  return (
    <div>
      <button onClick={handleTest}>Test</button>
    </div>
  )
}

export default index