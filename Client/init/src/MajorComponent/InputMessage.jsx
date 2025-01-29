import React from 'react'
import { useState } from 'react'
import { useChatstore } from '../store/useChatstore'
import { X , Image, Send} from 'lucide-react'
import { useRef } from 'react'

const InputMessage = () => {
    const [text, setText] = useState("") 
    const [imagePreview , setImagePreview] = useState(null)
    const {sendMessage} = useChatstore()
    const fileInputRef = useRef()

    
    const handleImageChange =  (e) => {
        const file = e.target.files[0];
        if(!file.type.startsWith("image/")){
            toast.error("Please select an image file")
            return;
        }
        
        const reader = new FileReader()
        reader.onloadend =() => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }
    
    const removeImage =  () => {
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    }
    
    const handleSendMessage = async (e) =>{
        e.preventDefault()
        if(!text.trim() && !imagePreview) return;
        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview
            })
    
            //Clear form
            setText("")
            setImagePreview(null)
            if(!fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send Message:", error);
        }}



    return (
            <div className="bottomBar relative px-4 flex items-center gap-4 w-full rounded-lg h-[10%] ">
              {imagePreview && (
                <div className='mb-3 flex items-center gap-2 absolute -top-20 left-1'>
                    <div className='relative'>
                        <img 
                            src={imagePreview} 
                            alt="Preview"
                            className='w-20 h-20 object-cover rounded-lg border border-zinc-700' 
                        />
                        <button
                            onClick={removeImage}
                            className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center'
                            type='button'
                        >
                            <X className='size-3'/>
                        </button>
                    </div>
                </div>
              )}
             
            <form onSubmit={handleSendMessage} className='flex gap-3 items-center justify-center w-full'>
              <input 
                type="text" 
                value={text}
                className='w-[80%] h-10 px-4 rounded-3xl ' 
                placeholder='Message....'
                onChange={(e)=>setText(e.target.value)}
            />
             <input 
                type='file'
                accept='image/*'
                className='hidden'
                ref={fileInputRef}
                onChange={handleImageChange}
             />

              <button
                className={`hidden sm:flex btn btn-circle 
                    ${imagePreview ? "text-emerald-500":"text-zinc-400"}`}   
                onClick={()=> fileInputRef.current?.click()}
              >
                <Image size={20}/>
              </button>  
             
              <button 
                className='bg-blue-500 size-12 flex items-center rounded-full px-4 py-1 text-white' 
                type='submit'
                disabled={!text.trim() && !imagePreview}
                >
                <Send size={28}/>
              </button>
            </form> 
            
            </div>
  )
}

export default InputMessage
