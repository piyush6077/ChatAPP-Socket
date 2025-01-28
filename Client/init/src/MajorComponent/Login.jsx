import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { Eye, Loader2, LucideEyeClosed, Vault } from 'lucide-react'
import toast from 'react-hot-toast'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const {login , isLoggingIng} = useAuthStore()

  const handleLogin = (e)=>{
    e.preventDefault()
    login(formData)
  }
 

return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <Vault/>  
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Log-In in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              // required
              // autoComplete="email"
              value={formData.email}
              onChange={(e)=>setFormData({...formData, email:e.target.value})}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              // required
              // autoComplete="current-password"
              value={formData.password}
              onChange={(e)=>setFormData({...formData, password: e.target.value})}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <button 
            type='button'
            onClick={()=>setShowPassword(!showPassword)}
            className='absolute right-0 top-0 w-8 h-10'>
              {showPassword ? 
              <Eye className='size-5 text-base-content/40 text-gray-700'/>
              :<LucideEyeClosed className='size-5  text-gray-700 text-base-content/40'/>
              }
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isLoggingIng}
          >
            {isLoggingIng ? (
              <>
                <Loader2 className='size-5 animate-spin'/>
                Loading.... 
              </>
            ):(
              "Create Account"
            )
          }
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Already Have Account?{' '}
        <Link to="/Signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Sign-Up
        </Link>
      </p>
    </div>
  </div>
  )
}

export default Login
