import React, { useContext } from 'react'
import userContext from '../Context/UserContext'
import GroupInfo from './GroupInfo'
import io from "socket.io-client"
import { Settings } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import {Link} from "react-router-dom"
import { User } from "lucide-react"
// const socket = io.connect("http://localhost:3001")

const MessageLayout = () => {
  const {showSlide, handleGroupInfo } = useContext(userContext)
  const {logout, authUser} = useAuthStore()

  const handleLogout = (e)=>{
    e.preventDefault();
    logout()
  }

  return (
    <div className='bg-purple-800 w-[72%] h-[100vh] relative' >
        <div className='flex flex-col h-full w-full' >
            <div className="TopBar w-full h-[8%] bg-yellow-500 items-center gap-4 px-4 justify-end flex">
              <div className="w-8 h-8 bg-purple-600" onClick={handleGroupInfo}>             
              </div>
              <Link className="w-8 h-8 justify-center flex items-center bg-purple-600"> 
                  <Settings className='size-4 text-white'/>
              </Link>
              <Link className="w-8 h-8 justify-center flex items-center bg-purple-600"> 
                  <User className='size-4 text-white'/>
              </Link>
              {authUser && (
                <div className="w-8 h-8 justify-center flex items-center bg-purple-600">
                  <LogOut className='size-4 text-white' onClick={handleLogout}/> 
                </div>
                ) 
              }
            </div>

            <div className="MainMessage w-full h-[84%] bg-blue-600">
            </div>
            <div className="bottomBar px-4 flex items-center gap-4 w-full rounded-lg h-[8%] bg-black">
              <input 
                type="text" 
                className='w-[90%] px-4 rounded py-1' 
                placeholder='Message....'/
              >
              <button 
                className='bg-blue-500 rounded-lg px-4 py-1 text-white' 
              >
                Send
              </button>
            </div>
        </div>
        {showSlide && <GroupInfo/>}
        
    </div>
  )
}

export default MessageLayout    