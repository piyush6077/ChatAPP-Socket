import React from 'react'
import Sidebar from "./Sidebar"
import MessageLayout from "./MessageLayout"

const Homepage = () => {
  return (
    <div className='flex w-[100vw]'> 
      <Sidebar/>
      <MessageLayout/>
    </div>
  )
}

export default Homepage
