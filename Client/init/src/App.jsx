import React, { useEffect} from 'react'
// import Sidebar from './MajorComponent/Sidebar'
// import MessageLayout from './MajorComponent/MessageLayout'
import { useAuthStore } from './store/useAuthStore'
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom"
import Homepage from './MajorComponent/Homepage'
import Login from './MajorComponent/Login'
import SettingPage from './MajorComponent/SettingPage'
import {Loader} from "lucide-react"
import SignUp from './MajorComponent/SignUp'
import ProfilePage from './MajorComponent/ProfilePage'
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const {authUser, checkAuth , isCheckingAuth} = useAuthStore()
  const {theme} = useThemeStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser)

  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center bg-black justify-center h-screen'>
      <Loader className="size-18 animate-spin text-white"></Loader> 
    </div>
  )

  return (
    <div data-theme={theme}>
      {/* <Navbar/> */}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={authUser ? <Homepage/>: <Navigate to="/Login"/>}></Route>
          <Route path='/Login' element={!authUser ? <Login/> : <Navigate to="/"/>}></Route>
          <Route path='/Signup' element={!authUser ? <SignUp/>: <Navigate to="/"/>}></Route>
          <Route path='/settingPage' element={<SettingPage/>}></Route>
          <Route path='/profilePage' element={authUser ? <ProfilePage/>:<Navigate to="/Login" /> }></Route>
        </Routes>
        </BrowserRouter>

        <Toaster/>
    </div>
  )
}

export default App
