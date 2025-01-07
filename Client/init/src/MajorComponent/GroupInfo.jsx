import React, { useContext } from 'react'
import userContext from '../Context/UserContext'

const GroupInfo = () => {

  const {handleGroupInfo}=useContext(userContext) 
  return (
    <div className='w-[300px] h-[100vh] bg-yellow-300 absolute top-0 right-0'>
        <div className='flex w-full h-[52px] bg-black text-xl justify-between items-center px-4'>
          <div>Group Info</div>
          <div className="w-10 h-10 bg-purple-600" onClick={handleGroupInfo}></div>  
        </div>
        <div className='w-full h-[120px] flex px-4 bg-red-50 items-center gap-3'>
          <div className='w-[]'>
            <div className='w-16 bg-black h-16 rounded-[50%]'></div>
          </div>
          <div className='w-[] h-14 py-1 flex flex-col gap-[1px]'>
              <h1 className='text-lg'>Channel Name</h1>
              <p className='mt-0 text-sm'>channel info</p>
          </div>
        </div>
        <div>
          <div>Admin</div>
          <div>Members</div>
        </div>
    </div>
  )
}

export default GroupInfo
