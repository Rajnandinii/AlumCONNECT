import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Topbar, AddPost} from './components/index.js'
const theme_color = import.meta.env.VITE_THEME_COLOR;


function HomeLayout() {

    const isPostFormOpen = useSelector((state)=>state.postFormToggle.isPostFormOpen) 
    const {loading} = useSelector((state)=>state.loadState) 

    return (
      <>
        <div className={`w-full min-h-screen md:flex dark:bg-gray-950 bg-gray-200`}>
             {loading && <div className='absolute z-50 w-full h-full flex items-center justify-center'>
                              <div className='backdrop-blur-sm backdrop-brightness-75 w-full h-full flex items-center justify-center'>
                                  <div className={`w-16 h-16 border-4 border-dashed rounded-full  animate-spin border-${theme_color}`}></div>
                              </div>
                          </div>}

             <Topbar/>

              {isPostFormOpen && 
                <div className="transition"> 
                  <AddPost/>
                </div>
              }

             <div className="pt-20 w-full "> 
                <Outlet/>
             </div>
             
        </div>

        <ToastContainer position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      
      </>
    )
  }
  
  export default HomeLayout