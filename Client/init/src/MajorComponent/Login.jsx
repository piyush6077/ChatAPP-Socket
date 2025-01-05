import React from 'react'

const Login = () => {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
        {user ? 
          (<div className='flex flex-col items-center justify-center gap-4 bg-purple-700 w-[300px] h-[400px]'>
          <h1>Log In </h1>  
          <div className='flex justify-start flex-col gap-2'> 
            <lable for="name">
              Name
            </lable>
            <input type="text" name='name'/>
            <label for="password" className='mt-3'>
              password :
            </label>
            <input type="Password" />
          </div>
          <button type="button" className='bg-white text-black font-semibold rounded-md p-1 w-[180px]'>Login</button>
          <p onClick={()=> setUser((prev)=> !prev)}>Create Account</p>
        </div>
        ):(
          <div className='flex flex-col gap-4 justify-center items-center bg-purple-700 w-[300px] h-[400px]'>
            <h1>SignUp</h1>
            <div className='flex justify-start flex-col gap-2'> 
            <lable for="text">
              Name :
              </lable>
              <input type="text" className=''/>
              <lable for="email" className='mt-3'>
              Email :
              </lable>
              <input type="text"/>
              <label for="password" className='mt-3'>
              password :
              </label>
              <input type="Password" />
            </div>
            <button type="button" className='bg-white text-black font-semibold rounded-md p-1 w-[180px]'>Sign Up</button>
            <p onClick={()=> setUser((prev)=> !prev)}>Login to your account</p>
          </div>
        ) 
      }
    </div>
  )
}

export default Login
