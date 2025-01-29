import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera } from 'lucide-react'

const ProfilePage = () => {
  const {isUpdatingProfile, authUser , updateProfile} = useAuthStore()
  const [selectedImage , setSelectedImage] = useState(null)

  const handleImageUpload = async (e)=>{
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async ()=>{
      const base64Image = reader.result;
      // console.log(base64Image)
      setSelectedImage(base64Image)
      await updateProfile({profilePic: base64Image});
    }
  
  }

  return (
    <div className='flex w-full justify-center'>

      <div className="flex w-[600px] m-10 rounded-lg gap-4 bg-purple-500 min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full flex flex-col items-center  sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                  Profile
                </h2>
                <p>You Profile info</p>  
              </div>
              <div className='flex flex-col items-center gap-4'>
                <div className='relative flex flex-col items-center'>
                  <img 
                    src={selectedImage||authUser.profilePic || "/avatar.png"} 
                    alt="" 
                    className='size-28 rounded-full object-cover border-4'
                  />
                  <label htmlFor="avatar-upload"
                    className={`absolute bottom-4 right-[70px] 
                    bg-base-content hover:scale-105 p-2 rounded-full
                    cursor-pointer transition-all duration-200
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none": ""}`}
                    
                  > 
                    <div className='bg-gray-800 rounded-full p-[6px]'>
                      <Camera className='w-5 h-5 text-white'/>
                    </div>
                    <input 
                      type="file"
                      id="avatar-upload"
                      className='hidden'
                      name=''
                      accept='image/*'
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                  <p className='text-sm text-zinc-400'>
                      {isUpdatingProfile ? "Uploading...." : "Click the camera icon to update Profile Image"}
                  </p>
                </div>
              </div>
      
              <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                  
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      Full name
                    </label>
                    <div className="mt-2">
                      <div className="block w-full h-9 p-2 bg-white rounded-lg text-black text-sm">
                        <p>{authUser?.fullname}</p>
                      <div/>
                    </div>                  
                    </div>
                  </div>
 
                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                    <div className="block w-full h-9 p-2 bg-white rounded-lg text-black text-sm">
                      <p>{authUser.email}</p>
                    <div/>
                    </div>
                  </div>
                </div>
              </div>

              <div className='text-zinc-400 text-sm w-full mt- justify-center flex flex-col items-center'>
                  <h1 className='text-lg text-gray-800 font-semibold'>Account Info</h1>
                  <div className='space-y-3 text-sm w-full'>
                    <div className='flex items-center justify-between py-2 border-b w-full border-zinc-700'>
                      <span>Member Since :</span>
                      <span>{authUser.createdAt?.split("T")[0]}</span>
                    </div>
                    <div className='flex items-center justify-between py-2 border-b w-full border-zinc-700'>
                      <span>Account Status : </span>
                      <span className='text-green-500'>Active</span>
                    </div>
                </div>
              </div>
            </div>   
          </div>
    </div>
  )
}

export default ProfilePage
