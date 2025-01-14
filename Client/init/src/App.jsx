import React, { useContext, useEffect} from 'react'
// import Axios from "axios"
import Sidebar from './MajorComponent/Sidebar'
import MessageLayout from './MajorComponent/MessageLayout'
import {io} from "socket.io-client"


const App = () => {
  const socket = io("http://localhost:3001")

  useEffect(() => {
    socket.on("connect", ()=>{
      console.log("connected")
      socket.emit("welcome" , `welcome to the chat : ${socket.id}`)
    })  

    socket.on("welcome" , (s)=>{console.log(s)})
  }, [])
  
   
  return (
    <div className='flex w-[100vw]'> 
      <Sidebar/>
      <MessageLayout/>
    </div>
  )
}

export default App
