import React from "react";
import { Outlet } from "react-router-dom";
import {Navbar,Footer} from "./components"
// import Navbar from "./components/Navbar/Navbar.jsx";
// import Footer from "./components/Footer/Footer.jsx";


function LandingLayout() {
    return (
      <>
      <Navbar/>
      <Outlet/>
      <Footer/>
      </>
    )
  }
  
  export default LandingLayout