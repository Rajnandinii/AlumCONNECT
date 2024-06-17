import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CloudUpload } from 'lucide-react';
import { togglePostForm } from '../../../redux/features/postFormToggleSlice';
import { toggleLoading } from '../../../redux/features/loadingSlice';
import { toast} from 'react-toastify'
import axios from 'axios';

const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

const Postform = () => {

  //for closing the post form (discard btn) using store variabe----------------------------------------------------------- --------------
  const dispatch = useDispatch()
  const closePostForm = () =>{
      dispatch(togglePostForm())
  }


  //for toggling confirm button ---------------------------------------------------------------------------------------------
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  
  const openConfirm = () =>{
      setIsConfirmOpen(true)
  }
  const closeConfirm = () =>{
    setIsConfirmOpen(false)
  }

  //for handling the values of title and desc and if one of them contains something, create btn will be enabled
  const [isCreateBtnDisabled, setIsCreateBtnDisabled] = useState(true)
  const [title, setTitle] =useState('')
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState(null); //for showing in frontend
  const [postImg, setPostImg] = useState(null)

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleDescChange = (e) => {
    setDesc(e.target.value)
  }

  useEffect(()=>{
    if(image || title || desc){
      setIsCreateBtnDisabled(false)
    }
    else{
      setIsCreateBtnDisabled(true)
    }

  },[image, title, desc])
   
  //for holding the image  --------------------------------------------------------------------------------------------------

  const [error, setError] = useState('');
  const imgInputRef = useRef()

  const handleImageUpload = (file) => {
    const fileType = file.type;
    const validImageTypes = ['image/jpeg', 'image/png'];
    if (!validImageTypes.includes(fileType)) {
      setError('Please upload a valid image file (JPEG, PNG)');
      return;
    }
    setPostImg(file)
    setError('');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      //onImageUpload(reader.result);  // Pass the image data to the parent component
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log('drop')
    if (files && files[0]) {
      handleImageUpload(files[0]);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImg = ()=>{
    setImage(null)
    setPostImg(null)
    if(imgInputRef.current){
      imgInputRef.current.value = '';
    }
  }

  //handle confirm/submit logic--------------------------------------------------------------------------
  const [isPinging, setIsPinging] = useState(false);

  function wait(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(toggleLoading())
    //setIsPinging(true);

    try{
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('postImg', postImg);
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/post/createPost`,formData, 
                                                                                                   {withCredentials:true,
                                                                                                    headers: {
                                                                                                      'Content-Type': 'multipart/form-data' 
                                                                                                    }
                                                                                                   })
        dispatch(toggleLoading())
        toast.success('Your Post is uploaded', { className: 'dark:bg-gray-800 bg-gray-200' })
        setIsPinging(true)
        await wait(1000)
        setIsPinging(false)
        
        dispatch(togglePostForm())

    }catch(error){
      if(error.response){
        toast.error(error.response.data.message, { className: 'dark:bg-gray-800 bg-gray-200' })
      }
      else{
        toast.error('Error occcured', { className: 'dark:bg-gray-800 bg-gray-200' })
      }
      dispatch(toggleLoading())
    }

  }; 

  //-------------------------------------------------------------------------------------------------------

  return (
    <div>
      <form className='dark:bg-gray-800 bg-gray-100 w-[350px] sm:w-[500px] border dark:border-gray-700 border-gray-400 rounded-lg shadow-2xl'>

        <div className='relative flex flex-col items-stretch justify-start '>

            <div className='flex justify-center items-center p-2 dark:text-gray-200 text-gray-800 border-b dark:border-gray-600 border-gray-400'>
                Create Post
            </div>

            <div className='flex flex-col items-stretch p-4 '>
                <label htmlFor='title' className='flex justify-start text-sm dark:text-gray-400 text-gray-800 mb-1'>
                   Title
                </label>
                <input onChange={handleTitleChange} id='title' type='text' placeholder='Add a Title for your post...' className=' w-full rounded-md py-1 px-2 text-md dark:text-gray-50 dark:bg-gray-700  bg-gray-50 dark:focus:bg-gray-900 focus:bg-gray-200 outline-none border dark:border-gray-600 border-gray-300 dark:focus:border-gray-700  focus:border-gray-200'/>
            </div>

            <div className='flex flex-col items-stretch  p-4'>
                <label htmlFor='description' className='flex justify-start text-sm dark:text-gray-400 text-gray-800 mb-1'>
                   Description
                </label>
                <textarea onChange={handleDescChange} id='description' type='text' placeholder='Add a description...' className='w-full rounded-md h-20 min-h-20 max-h-40 py-1 px-2 text-md dark:text-gray-50 dark:bg-gray-700  bg-gray-50 dark:focus:bg-gray-900 focus:bg-gray-200 outline-none border dark:border-gray-600 border-gray-300 dark:focus:border-gray-700  focus:border-gray-200'></textarea>
            </div>
            
            <div className="flex flex-col items-stretch justify-center w-full p-4">
                <div className='flex justify-between text-sm dark:text-gray-400 text-gray-800 mb-1'>
                  <div>Add Photo</div>
                  {image && 
                      <div onClick={removeImg} className='text-red-400'>
                        <button>Remove Photo</button>
                      </div>}

                </div>

                <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full border-2  ${image? 'dark:border-gray-600 border-gray-200' : 'border-dashed border-gray-300'} rounded-md cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}>
                  <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className={`flex flex-col items-center justify-center `}>
                    {!image && (
                      <>
                        <CloudUpload className='w-16 h-16 mb-4 mt-4 dark:text-gray-400 text-gray-500'/>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag
                          and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
                          PNG, JPG (MAX. 800x400px)
                        </p>
                      </>
                    )}
                    {image && (
                      <img src={image} alt="Uploaded" className=" h-64 w-full object-cover" />
                    )}
                    {error && (
                      <p className='pb-2 font-semibold text-gray-600 animate-bounce'>{error}</p>
                    )}
                  </div>
                  <input ref={imgInputRef} id="dropzone-file" onChange={handleChange} type="file" className="hidden"/>
                </label>            

            </div> 

            <div className='flex items-center justify-end pt-0 p-4 gap-4'>
              <button type='button' onClick={openConfirm} disabled={isCreateBtnDisabled} className={`${isCreateBtnDisabled ? 'cursor-not-allowed opacity-30' : ' dark:hover:bg-gray-900 hover:bg-gray-300'} bg-gray-100 dark:bg-gray-800 dark:text-gray-100 text-gray-800  border dark:border-gray-600 border-gray-400 rounded-lg px-2 py-1`}>
                Create
              </button>
              <button onClick={closePostForm} type='button' className='dark:bg-gray-800 bg-gray-100 dark:text-gray-100 text-gray-800 dark:hover:bg-red-900 hover:bg-red-400 dark:hover:bg-opacity-50 bg-opacity-60 dark:hover:border-red-800 hover:border-red-600 hover:text-white border border-gray-400 dark:border-gray-600 rounded-lg px-2 py-1'>
                Discard
              </button>
            </div>
            
            {/*below is hidden unless upload button is prressed*/}
            {isConfirmOpen && 
            <div className='absolute z-10 inset-0 flex items-center justify-center dark:bg-opacity-80 bg-opacity-80 rounded-lg dark:bg-gray-800 bg-gray-400'>
              <div className='flex flex-col rounded-lg p-2 w-full m-16 shadow-2xl shadow-gray-950 h-72 items-center justify-center dark:bg-gray-900 bg-gray-100'>
                <IoIosCheckmarkCircleOutline className={`${isPinging? `animate-ping text-${theme_color}` : 'text-gray-500'} size-32`}/>
                <div className='flex justify-center gap-5 items-center p-5 mt-6'>
                  <button onClick={handleSubmit} className={` p-1 px-5 dark:border border-2 border-${theme_color} border-opacity-60 dark:bg-gray-800 bg-gray-50 text-${theme_color} hover:text-gray-100 hover:bg-${theme_color} transition-transform ease-in-out hover:scale-110 rounded-lg `}>
                    Confirm
                  </button>
                  <button type='button' onClick={closeConfirm} className='p-1 px-5 w-24 dark:bg-gray-800 bg-gray-50 dark:text-gray-200  dark:hover:bg-gray-600 hover:bg-gray-500 hover:text-gray-50 dark:border border-2 border-gray-400 hover:border-gray-500 transition-transform  ease-in-out hover:scale-110 rounded-lg'>
                    Cancel
                  </button>
                </div>  
              </div>
            </div>}

        </div>
        
      </form>
    </div>
  )
}

export default Postform
