import React, { useEffect, useState } from 'react'
import Axios from "axios"
import Sidebar from './MajorComponent/Sidebar'
import MessageLayout from './MajorComponent/MessageLayout'

const App = () => {
  const [data, setData] = useState("")
  // const [user, setUser] = useState(true)

  const getData = async()=>{
    const response =await Axios.get("http://localhost:3000/getData");
    setData(response.data)
  }

  useEffect(() => {
    getData()
  }, [])
  

  return (
    <div className='flex w-[100vw]'> 
      {/* <div>{data}</div> */}
      <Sidebar/>
      <MessageLayout/>
    </div>
  )
}

export default App
