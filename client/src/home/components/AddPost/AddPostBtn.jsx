import React from 'react'
import {Plus} from 'lucide-react'

const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

const AddPostBtn = () => {
  return (
    <div>
        <div className='mt-4 rounded-lg w-full flex flex-col items-stretch p-4 pt-0 shadow-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800'>
            <div className='flex justify-center my-2 text-gray-800 dark:text-gray-200'>
                <span>Add Post</span>
            </div>

            <div className='flex justify-center mt-1 mb-2 p-2 py-5 items-center border rounded-lg border-dashed dark:border-gray-600 border-gray-400 max-h-36 dark:bg-gray-800 bg-gray-100'>
                 
                <button class={`flex items-center p-2  transition ease-in duration-200 uppercase rounded-2xl text-gray-800 dark:text-gray-200 hover:bg-${theme_color} hover:bg-opacity-50 hover:text-white  focus:outline-none`}>
                    <Plus className={`fill-current`}/>
                </button>

            </div>

        </div>
      
    </div>
  )
}

export default AddPostBtn
