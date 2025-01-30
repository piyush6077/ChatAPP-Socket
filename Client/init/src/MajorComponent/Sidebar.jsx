import React, { useEffect } from 'react'
import { useChatstore } from '../store/useChatstore'
import { useAuthStore } from '../store/useAuthStore'
// import { User } from 'lucide-react';

const Sidebar = () => {
    const {getUsers, users , selectedUser , setSelectedUser , isUserLoading } =  useChatstore()

    const {isOnlineUsers} = useAuthStore()

    useEffect(() => {
        // console.log(selectedUser)
        getUsers();
      }, [getUsers]);
    
      console.log("onlineUsers : " , isOnlineUsers)
    // if(isUserLoading) return <div>User Loading.... </div> // make Ui better 
    return (

    <div className='bg-purple-500 min-w-[300px] w-[400px] h-[100vh]'>
        <div className='flex flex-col h-full w-full'>
            <div className="logoSection w-full h-[8%] bg-gray-900">
                w
            </div>
            <div className="contacts w-full flex-col h-[92%] items-center flex">
                <div className="w-[95%] h-[8%] relative">
                    <input type="text" className="p-2 w-full outline-none mt-4 rounded-3xl" />
                    <button className="absolute top-6 right-5">S</button>
                </div>
                {isUserLoading ? (<div>
                    Loading User
                </div>) : (
                    <div className='srcollbardiv scrollbar-thin scrollbar-track-gray-50
                    mt-5 w-[95%] min-w-[250px] h-[92%] bg-green-500 flex flex-col  overflow-y-auto '>
                    {users.map((user)=>(
                        <button
                            key={user._id}
                            onClick={()=>setSelectedUser(user)} 
                            className={`p-4 bg-red-500 min-w-[95px] w-full h-[85px] flex 
                                items-center rounded-sm border-b border-gray-700
                                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300":""}
                            `}
                        >
                            <div className='w-[20%]'>
                                <div className='w-[90%] min-w-14 relative bg-black h-14 rounded-full'>
                                    <img
                                        src={user.profilePic || "./avatar.png"}
                                        className='w-full h-full rounded-full'
                                        />
                                     
                      {isOnlineUsers.includes(user._id) && (
                        <span
                          className="absolute bottom-2 right-0 size-2 bg-green-500
                        rounded-full ring-1 ring-zinc-900"
                        ></span>
                      )}
                                </div>
                            </div>
                            <div className='w-[80%] h-14 py-1 ml-2 flex flex-col items-start gap-[1px]'>                                                             
                                <h1 className='text-lg'>{user.fullname}</h1>
                                <p className='mt-0 text-sm'>hello i am here</p>
                            </div>
                        </button>
                    ))}
                </div>
                )}
            </div>
            <div className="logo"></div>
        </div>
    </div>
  )
}

export default Sidebar
