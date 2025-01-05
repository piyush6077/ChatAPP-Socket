import React from 'react'

const Sidebar = () => {
  return (
    <div className='bg-purple-500 w-[28%] h-[100vh]'>
        <div className='flex flex-col h-full w-full'>
            <div className="logoSection w-full h-[8%] bg-gray-900">
                w
            </div>
            <div className="contacts w-full flex-col h-[92%] items-center flex">
                <div className="w-[95%] h-[8%] relative">
                    <input type="text" className="p-2 w-full outline-none mt-4 rounded-3xl" />
                    <button className="absolute top-6 right-5">S</button>
                </div>
                <div className='mt-5 w-[95%] h-[92%] bg-green-500 flex flex-col gap-2'>
                    <div className='p-4 bg-red-500 w-full h-[85px] flex items-center rounded-md gap-2'>
                        <div className='w-[20%]'>
                            <div className='w-[90%] bg-black h-14 rounded-[50%]'>

                            </div>
                        </div>
                        <div className='w-[80%] h-14 py-1 flex flex-col gap-[1px]'>
                            <h1 className='text-lg'>Piyush</h1>
                            <p className='mt-0 text-sm'>hello i am here</p>
                        </div>
                    </div>
                    <div className='p-4 bg-red-500 flex rounded-md'>
                        <div className='w-14 h-14 rounded-[50%] bg-fuchsia-700'>
                        </div>
                    </div>
                </div>
            </div>
            <div className="logo"></div>
        </div>
    </div>
  )
}

export default Sidebar
