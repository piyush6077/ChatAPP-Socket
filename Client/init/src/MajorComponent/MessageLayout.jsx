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
  const {message ,getMessages, isMessageLoading , selectedUser} = useChatstore();
  
  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  return (
    <div className='bg-purple-800 w-[72%] h-[100vh] relative' >
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
            {/* <MessageContainer/> */}
                <div className="MainMessage w-full h-[84%] bg-blue-600 overflow-y-auto">
                    {message.map((messages)=>(
                        <div 
                            key={messages._id}
                            className={`chat ${messages.senderId === authUser._id ? "chat-end": "chat-start"}`}
                        >
                            <div className="chat-image avatar">
                                <div className='size-10 rounded-full border'>
                                    <img 
                                        src={
                                            messages.senderId === authUser._id 
                                            ? authUser.profilePic || "avatar.png" 
                                            : selectedUser.profilePic || "avatar.png"}
                                        alt="profile Pic" 
                                    />
                                </div>
                            </div>
                            <div>
                                <time className="text-xs opacity-50 ml-1">
                                    {formatMessageTime(messages.createdAt)}
                                </time>
                            </div>
                            <div className='chat-bubble flex flex-col'>
                                {messages.image && (
                                    <img 
                                        src={messages.image} 
                                        alt="Attachment"
                                        className='sm:max-w-[200] w-52 h-48 rounded-md mb-2' 
                                    />
                                )}
                                {messages.text && <p>{messages.text}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            

            <InputMessage/>
        </div>
        {showSlide && <GroupInfo/>}
        
    </div>
  )
}

export default MessageLayout    