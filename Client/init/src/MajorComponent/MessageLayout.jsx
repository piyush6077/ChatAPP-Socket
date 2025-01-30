import React, { useContext } from 'react'
import userContext from '../Context/UserContext'
import GroupInfo from './GroupInfo'
import io from "socket.io-client"
import { Settings } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import {Link} from "react-router-dom"
import { User } from "lucide-react"
import { useChatstore } from '../store/useChatstore'
import { useEffect } from 'react'
import MessageContainer from './MessageContainer'
import InputMessage from './InputMessage'
// const socket = io.connect("http://localhost:3001")
import { formatMessageTime } from '../lib/utils';


const MessageLayout = () => {
  const {showSlide, handleGroupInfo } = useContext(userContext)
  const {logout, authUser} = useAuthStore()

  const handleLogout = (e)=>{
    e.preventDefault();
    logout()
  }
  
  // Chatcontainer Logic 
  const {message ,getMessages, isMessageLoading , selectedUser,subscribeToMessages,unsubscribeFromMessages} = useChatstore();
  
  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      getMessages(selectedUser._id);
    
    }
    subscribeToMessages();

    return ()=>unsubscribeFromMessages();
  }, [selectedUser, getMessages,subscribeToMessages,unsubscribeFromMessages]);

  return (
    <div className='w-[72%] h-[100vh] relative' >
        <div className='flex flex-col h-full w-full' >
            <div className="TopBar w-full h-[8%] bg-yellow-500 items-center gap-4 px-4 justify-end flex">
              <div className="w-8 h-8 bg-purple-600" onClick={handleGroupInfo}>             
                {selectedUser && (<div>{selectedUser.fullname}</div>)}
              </div>
              <Link className="w-8 h-8 justify-center flex items-center bg-purple-600"> 
                  <Settings className='size-4 text-white'/>
              </Link>
              <Link  to="/profilePage" className="w-8 h-8 justify-center flex items-center bg-purple-600"> 
                  <User className='size-4 text-white'/>
              </Link>
              {authUser && (
                <div className="w-8 h-8 justify-center flex items-center bg-purple-600">
                  <LogOut className='size-4 text-white' onClick={handleLogout}/> 
                </div>
                ) 
              }
            </div>
            <MessageContainer/>
            <InputMessage/>
        </div>
        {showSlide && <GroupInfo/>}
        
    </div>
  )
}

export default MessageLayout    