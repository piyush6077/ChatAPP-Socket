import React, { useContext } from 'react'
import userContext from '../Context/UserContext'
import GroupInfo from './GroupInfo'

const MessageLayout = () => {
  const {showSlide, handleGroupInfo , setShowSlide} = useContext(userContext)

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
w
            </div>
        </div>
        {showSlide && <GroupInfo/>}
        
    </div>
  )
}

export default MessageLayout    