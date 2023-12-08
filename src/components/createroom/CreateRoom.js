import React from 'react'
import { useState, useEffect } from 'react'
import HTTP from '@/utils/HTTP'
function CreateRoom(props) {
  const [members, setMembers] = useState([])
  const [payload, setPayload] = useState({
    title: '',
    type: 'PUBLIC',
    account: []
  })
  useEffect(() => {
    const getMembers = () => {
      HTTP.get("account/api/userselect/").then((res) => {
        if(res.status === 200) {
          setMembers(res.data)
        }
      })
    }
    getMembers()
  }, [])

  const handleCreateRoom = () => {
    console.log(payload);
    HTTP.post("chat/api/chatroom/", payload).then((res) => {
      if(res.status === 200) {
        props.setIsPopup(false)
      }
    })
  }


  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Create room
              </h3>
              <div className="mt-2">
                <div className="mt-7">
                  <label htmlFor="room-name" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="room-name"
                      id="room-name"
                      onChange={(e) => setPayload({...payload, title: e.target.value})}
                      className="shadow-sm p-2 border border-gray-light focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
                      placeholder="Type room name"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="room-description" className="block text-sm font-medium text-gray-700">
                    Room type
                  </label>
                  <div className="mt-1">
                    <select
                      id="room-type"
                      name="room-type"
                      className="shadow-sm border-gray-light p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={"PUBLIC"}
                      onChange={(e) => setPayload({...payload, type: e.target.value})}
                    >
                      <option value="PUBLIC">Public</option>
                      <option value="PRIVATE">Private</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="room-description" className="block text-sm font-medium text-gray-700">
                    Members
                  </label>
                  <div className="mt-1">
                    <select
                      id="room-members"
                      name="room-members"
                      className="shadow-sm border-gray-light p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      multiple
                      onChange={(e) => setPayload({...payload, account: [...payload.account, e.target.value]})}
                    >
                    {
                      members.map((member, index) => {
                        return (
                          <option value={member.id} key={index}>{member.fullname}</option>
                        )
                      })
                    }
                    </select>
                  </div>
                </div>
                <div className='flex w-full justify-center gap-2 mt-4 items-center'>
                  <button className=" bg-gray rounded-lg text-white px-5 py-3 text-sm" 
                    onClick={() => props.setIsPopup(false)}
                  >Close</button>
                  <button className=" bg-red rounded-lg text-white px-5 py-3 text-sm" 
                    onClick={handleCreateRoom}
                  >Create</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRoom