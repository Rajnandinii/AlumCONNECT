import React from "react";
import { Outlet } from "react-router-dom";
import {Navbar,Footer} from "./components"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import Navbar from "./components/Navbar/Navbar.jsx";
// import Footer from "./components/Footer/Footer.jsx";


function LandingLayout() {
    return (
      <>
      
      <Navbar/>
      <Outlet/>
      <Footer/>

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
  
  export default LandingLayout