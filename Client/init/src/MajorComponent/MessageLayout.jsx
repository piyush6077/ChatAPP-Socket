import React, { useContext } from 'react'
import userContext from '../Context/UserContext'
import GroupInfo from './GroupInfo'
import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

const MessageLayout = () => {
  const {showSlide, handleGroupInfo } = useContext(userContext)

  const sendMessage = () =>{
    socket.emit()
  }

  return (
    <div className='bg-purple-800 w-[72%] h-[100vh] relative' >
        <div className='flex flex-col h-full w-full' >
            <div className="TopBar w-full h-[8%] bg-yellow-500 items-center gap-4 px-4 justify-end flex">
              <div className="w-10 h-10 bg-purple-600" onClick={handleGroupInfo}>             
              </div>
              <div className="w-10 h-10 bg-purple-600"></div>
            </div>
            <div className="MainMessage w-full h-[84%] bg-blue-600">
            </div>
            <div className="bottomBar w-full h-[8%] bg-black">
              <input type="text" className='w-[80]' placeholder='Message....'/>
              <button onClick={sendMessage} className='bg-blue-500' >Send</button>
            </div>
        </div>
        {showSlide && <GroupInfo/>}
        
    </div>
  )
}

export default MessageLayout    