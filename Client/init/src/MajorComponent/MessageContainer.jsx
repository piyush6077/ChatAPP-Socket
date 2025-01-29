import React ,{useEffect} from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { useChatstore } from '../store/useChatstore'; 
// import { Message } from '../../../../Server/src/Models/Messages.model';
import { formatMessageTime } from '../lib/utils';

const MessageContainer = () => {
    const {message ,getMessages, isMessageLoading , selectedUser} = useChatstore();
    const {authUser} = useAuthStore()

    useEffect(() => {
        if (selectedUser && selectedUser._id) {
            console.log('Selected User:', selectedUser);
            getMessages(selectedUser._id);
        }
    }, [selectedUser, getMessages]);
    
    console.log("selectedUser :",selectedUser)
    console.log("authUser :",authUser)
    
  return (
    <div className="flex-1 h-[84%] p-4 overflow-y-auto">
    {message.map((messages)=>(
        <div 
            key={messages._id}
            className={`chat ${messages.senderId === authUser._id ? "chat-end": "chat-start"}`}
        >
            <div className="chat-image avatar">
                <div className={`size-10 rounded-full border ${messages.senderId !== authUser ? "mt-" :"mt-8"}`}>
                    <img 
                        src={
                            messages.senderId === authUser._id 
                            ? authUser.profilePic || "/avatar.png" 
                            : selectedUser.profilePic || "/avatar.png"}
                        alt="profile Pic" 
                    />
                </div>
            </div>
            <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(messages.createdAt)}
                </time>
            </div>
            <div className='chat-bubble flex flex-col'>
                {messages.image && (
                    <img 
                        src={messages.image} 
                        alt="Attachment"
                        className='sm:max-w-[200] h-48 rounded-md mb-2' 
                    />
                )}
                {messages.text && <p>{messages.text}</p>}
            </div>
        </div>
    ))}
</div>

  )
}

export default MessageContainer
